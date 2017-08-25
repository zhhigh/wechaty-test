import {Room, Contact, Message, MsgType,FriendRequest,MediaMessage} from "wechaty";
/// <reference path="./w.ts" />


import {WelComeMsg,addFansWord} from "./config";
//import {HOUR_OFFSET} from "./config";
//import {WxUtil} from "/util";
//import Util from "./util";
//import {GLOABL_JOINMSG_TYPE} from "./config";
import Wx   from "./wx";

//import Util = require("./util");
var memberList:string[] = [];

//const g_Path = require('path');
//const IMAGE_PATH   = '/bot/meizitu/';
//const IMAGE_QRCODE = '/bot/qr/';
var   SEND_NUMBER = 0 ;
//import {WeChat} from "./w";
var roomList:string[] = [];
/*const Tuling123       = require('tuling123-client');
const TULING123_API_KEY = '117a50247967ca410c00457c85d0cf50';
const tuling = new Tuling123(TULING123_API_KEY);*/

var Redis = require('ioredis');

var redis = null;

const ROOM_NAME_EX     ='免费发放微信群二维码';
const ROOM_NAME_EX1    ='免费发放微信群二维码';
const ROOM_NAME_EX2    ='免费发放微信群二维码2';

const ALL_GROUP_ENUMS:string[] = [
    '免费发放微信群二维码1',
    '免费发放微信群二维码2',
    '免费发放微信群二维码3',
    '免费发放微信群二维码4',
];

var SEND_ROOM_LIST:string[] = [];
const FROM_GROUP =`




-----消息来自群------
`;

var globalJSON=[];
interface groupCtrlJson{
    from    : string,
    content : string,
    topic   : string,
    count   : number,
};
var GROUP_SEND_COUNT = 0;
var ORIGINAL_GROUP_NAME ='';
var IS_GROUP_SEND = false;
//var GROUP_SEND_ARRAY:string =[];

/*if (redis === null){
    try{
        redis =new Redis({
            port: 6379,          // Redis port
            host: '172.17.0.2',   // Redis host
            family: 4,           // 4 (IPv4) or 6 (IPv6)
            //password: 'Wechat@139.com',
            db: 0
        });
    }catch(e){
        console.log('error',e);
    }
}else{
    console.log('redis connneted!');

}*/

//import Redis from "ioredis";


exports = module.exports = async function onMessage (message){
    let room    = message.room();
    let sender  = message.from();
    let content = message.content();
    let senderName = sender.name();
    //console.log(message.self());
    sendGroupMsg(message);

}


/*
let initRedis = function():void{

    if(){

    }
    try{
        redis =new Redis({
            port: 6379,          // Redis port
            host: '118.89.19.59',   // Redis host
            family: 4,           // 4 (IPv4) or 6 (IPv6)
            password: 'Wechat@139.com',
            db: 0
        });
    }catch(e){
        console.log('error',e);
    }
}
*/
let initDB = function():void{

    if (redis === null){
        try{
            redis =new Redis({
                port: 6379,          // Redis port
                host: '172.17.0.2',   // Redis host
                family: 4,           // 4 (IPv4) or 6 (IPv6)
                //password: 'Wechat@139.com',
                db: 0
            });
        }catch(e){
            console.log('error',e);
        }
    }else{
        console.log('redis connneted!');

    }

}


let setGNumber = function(redis):void{
    try{
   redis.set('SEND_NUMBER', 110);
    }catch(e){
        console.log('error',e)
    }
}

let getGNumber = function(redis):void{
    //redis.get('SEND_NUMBER');

    /*redis.get('SEND_NUMBER', function (err, result) {
        console.log('SEND_NUMBER',result);
    });*/

    redis.get('SEND_NUMBER').then(function (result) {
        console.log(result);
    });
}

/*
let setGroupCtrl = function(redis):void{
    return;
}*/

let sendSpecicalRoom = async function(message:Message,roomName:string):Promise<any> {
    let keyRegEx = new RegExp(roomName);
    console.log('keyregex',keyRegEx);
    try{
        let roomObj   = await Room.find({topic: keyRegEx});
        //console.log(roomObj);
        if (roomObj){
            console.log('room obj is not null');
            if(message.self()){
                let content = message.content();
                let sendMsg = '';
                //sendMsg = content+FROM_GROUP+"【"+ORIGINAL_GROUP_NAME+"】";
                //sendMsg = content+FROM_GROUP;
                sendMsg = content;
                await roomObj.say(sendMsg);
                console.log('--log--:','group msg send by :'+roomName);
                delFromArray(SEND_ROOM_LIST,roomName);

        }
        }else{
            console.log('roomobj is null');
        }

    }catch(e){
        console.log('error',e);
    }

    return;
}

let isAdmin = function(sender:string,admin:string):boolean{
    if(sender === admin){
        return true;
    }else{
        return false;
    }

}

let isRoom = function(message:Message):boolean{
    let room = message.room();
    if (!room){
        console.log('out room');
        return false;
    }else{
        console.log('in room');
        return true;
    }
}

let isSpeicialRoom =  function(message:Message,name:string):boolean {
    let room = message.room();
    let keyRegEx = new RegExp(name);
    if (keyRegEx.test(message.room().topic())) {
       return true;
    }else{
        return false;
    }
}

let getGroupCount = function():number{
    return ALL_GROUP_ENUMS.length;
}

let isGroup =  function(name:string):boolean {
    if(ALL_GROUP_ENUMS.indexOf(name) === -1){
       return false;
    }else{
        return true;
    }

}

let delFromArray = function(strArr:string[],element):void{
    if(strArr.length <=0){
        return;
    }

    let pos = strArr.indexOf(element);
    if (pos === -1){
        return;
    }
    strArr.splice(pos,1);
}


let sendGroupMsg = async function(message:Message):Promise<void>{

    if(!message.self()){
        return;
    }

    if(message.type() != 1){
        return;
    }

    const room = message.room();
    //const content = message.content();
    if (!room){
        console.log('out room');
        return;
    }else{
        console.log('in room');
    }

    let topic = room.topic();

    ORIGINAL_GROUP_NAME = topic;

    let isgroup = isGroup(topic);
    if(!isgroup){
        return;
    }

    if(SEND_ROOM_LIST.length === 0 ){
        SEND_ROOM_LIST = ALL_GROUP_ENUMS;
        delFromArray(SEND_ROOM_LIST,topic);
    }

    console.log('send_room_list',SEND_ROOM_LIST);
    for (let num in SEND_ROOM_LIST){
        let result = SEND_ROOM_LIST[num];
        if(result === topic){
            console.log('this room is in list!');
        }else{
            console.log('for del arr:',SEND_ROOM_LIST);
            await sendSpecicalRoom(message,result);
        }

    }
    return;
}