import {Room, Contact, Message, MsgType,FriendRequest,MediaMessage} from "wechaty";

import {WelComeMsg,DefaultReplyMsg,addFansWord} from "./config";
import {IMAGE_PATH,IMAGE_QRCODE,ROOM_NAME,ADMIN1,ADMIN2} from "./config";
//import {GLOABL_JOINMSG_TYPE} from "./config";
const fs = require('fs');
//var RedisDb = require('ioredis');
//import {RedisDB} from "ioredis";
//import {RedisDB} from "ioredis";

/*
 const room      = message.room();
 const sender    = message.from();
 const content   = message.content();
* */
var memberList:string[] = [];
var SEND_NUMBER = 0 ;

export class Wx{
     public  message:Message;
     private room   :Room;
     private sender :Contact;
     private content:string;
     private redis = null;
     //private memberList:string[] = [];
     //private SEND_NUMBER = 0;

    constructor(msgObj:Message,redis){
        this.message = msgObj;
        this.room    = this.message.room();
        this.sender  = this.message.from();
        this.content = this.message.content();
        this.redis   = redis;

    }

    private async sendQrcodeToRoom():Promise<void>{
        let qrPath = this.getPicPathV1(IMAGE_QRCODE);
        try{
            const roomObj   = await Room.find({topic:/免费发放微信群二维码/});
            if (roomObj){
                //console.log('invite: ');
                await roomObj.say(new MediaMessage(qrPath));
            }
        }catch(e){
            console.log('error:',e);
        }

    }


    public async switchMsg():Promise<void>{
        let qrPath = this.getPicPathV1(IMAGE_QRCODE);
        let meiziPath = this.getPicPathV1(IMAGE_PATH);
        console.log(`"qr path is ----"${qrPath}`);
        switch(this.content){
            case '2' :
                await this.replyTxtMsg('私聊，谢谢！');
                break;
            case '3' :
                await this.replyTxtMsg('私聊，谢谢！');
                break;
            case '4' :
                await this.replyTxtMsg('私聊，谢谢！');
                break;
            case '5' :
                await this.replyTxtMsg('私聊，谢谢！');
                break;
            case '1' :
                try{
                    await this.replyPic(qrPath);
                }catch(e)
                {
                    console.log('error:',e);
                }

                break;
            case '二维码' :
                try{
                    await this.replyPic(qrPath);
                }catch(e)
                {
                    console.log('error:',e);
                }
                break;
            case 'qrcode' :
                try{
                    await this.replyPic(qrPath);
                }catch(e)
                {
                    console.log('error:',e);
                }
                break;
            case 'qr' :
                try{
                    await this.replyPic(qrPath);
                }catch(e)
                {
                    console.log('error:',e);
                }
                break;
            case '美女':
                try{
                    await this.replyPic(meiziPath);
                }catch(e)
                {
                    console.log('error:',e);
                }

                break;
            case 'girl':
                try{
                    await this.replyPic(meiziPath);
                }catch(e)
                {
                    console.log('error:',e);
                }
                break;
            case '妹子':
                try{
                    await this.replyPic(meiziPath);
                }catch(e)
                {
                    console.log('error:',e);
                }
                break;
            case 'meizi':
                try{
                    await this.replyPic(meiziPath);
                }catch(e)
                {
                    console.log('error:',e);
                }
                break;
            case'kick':
                //await this.kickFromRoom();
                break;
            case 'wechat':
                try{
                    this.addFansToGroup();
                }catch(e){
                    console.log('error',e);
                }

                break;
            default:
                try{
                    let random = this.getRandomToSendTime();
                     await setTimeout(() => {
                        console.log('reply txt msg-----',random);
                        this.replyTxtMsg(WelComeMsg);;
                    }, random);
                }catch(e)
                {
                    console.log('error',e);
                }
               break;
        }
        return;
    }


    public async replayAll():Promise<void>{
        /*if(this.sender.name() === '熊小熊' | '熊小赫'){
            return;
        }*/

        if (this.message.type() === 49){//official accounts
            console.log('it is official accounts!');
            return;
        }
        /*过滤掉公众号、私聊*/
        /*if(this.message.rawObj['MMIsChatRoom'] === false){
            return;
        }*/

        const topic = this.room ? '[' + this.room.topic() + ']' : '';
        const name      = this.sender.name();
        //console.log(`${topic} <${this.sender.name()}> : ${this.message.toStringDigest()}`);
        if(this.room){
             //console.log('room is true!');
            if ( /免费发放微信群二维码/.test(this.message.room().topic()) && !this.message.self()) {
                console.log('in chat room!');
                try{
                    await this.switchMsg();
                }catch(e)
                {
                    console.log('error',e);
                }
                return;
            }
            return;
        };

        if (this.message.self() && this.room) {
            console.log('message is sent from myself, or inside a room.');
            return;
        }

        //if(!this.sender.stranger() && !this.message.self()){
        if(!this.message.self()){
            try{
                await this.switchMsg();
            }catch(e)
            {
                console.log('error',e);
            }
           return;
        }
/*
        try{
            await this.switchMsg();
        }catch(e)
        {
            console.log('error',e);
        }
*/
        return;
    }


    public async replyPersonMsg():Promise<void>{

        if (this.message.type() === 49){//official accounts
            console.log('it is official accounts!');
            return;
        }
        return;
    }

    public async replyTxtMsg(txtMsg:string):Promise<void>{

        /*  -- filter :公众号
                       bot
        * */
        this.message.say(txtMsg);
        return;

    }

    public async replyPic(filePath:string):Promise<void>{
        //console.log('sender name is :'+ this.sender.name());
        //if(!this.message.self()){
        //    console.log('it is false!');
        //    return;
        //}
        console.log(`"sended---"${filePath}`);
        try{
            await this.message.say(new MediaMessage(filePath));
        }catch(e){
            console.log('error:',e);
        }
        console.log(`"pic was sended---"${filePath}`);
        return;
    }

    public async reply():Promise<void>{
        if (this.room){
            if ( !/免费发放微信群二维码/.test(this.message.room().topic())&& this.message.self()) {
                return;
            }
        }
        return;
    }

    /*private returnWXRawObj():any{

    };*/
    public getRandomToSendTime():number{
        //let randomList:number[] = [6000,7000,8000,9000,10000,11000,12000,13000,14000,15000];
        console.log('inside get Random！');
        let randomList:number[] = [6000,7000,8000,9000,10000,11000,12000];
        //let randomList = [6000,7000,8000,9000,10000,11000,12000];
        console.log('randomList !');
        let length     = randomList.length;
        let random     = Math.random() *( length - 1 ) + 1;
        let temp       = Math.round(random);
        console.log(randomList[temp-1]);
        //return 6000;
        return randomList[temp-1];
    }

    public getPicPathV1(filePath:string):string{

        let fileList:number[] = fs.readdirSync(filePath);
        let length:number     = fileList.length;
        let random            = this.getRandomToFile(1,length);
        let fileName          = fileList[random];
        return filePath+fileName;

    }

    /*废弃getPicPath*/
    public getPicPath(filePath:string):string{
        var fileName = "";
        /*fs--------------------------
        *  fs里面千万不要调用类的函数，好像执行不起，为这个花了两天，直接用系统函数
        * */
        var fileAllPath = '';
        fs.readdir(filePath,function(err,files){
            if(err){
                return console.error(err);
            }
            const length = files.length;
            console.log(`"files count:  "${length}`);
            let random =Math.round(Math.random() *( length - 1 ) + 1);
            //*****千万不能用这个代码，花了两天时间才发现，这个执行不力let random = this.getRandomToFile(1,length);
            console.log(`"random is : "${random}`);
            fileName = files[random];
            fileName = filePath + fileName;
            fileAllPath = fileName;
            console.log(`"filename is : "${fileName}`);
        });
        return fileAllPath;
    }


    public getRandomToFile (min:number ,max:number ):number{
        const random = Math.random() *( max - min ) + min;
        return Math.round(random);
    }

    public async delContactFromRoom():Promise<void>{
        await this.message.say('不准发广告，踢了：@'+this.sender);
        this.room.del(this.sender);
    }

    public async kickFromRoom():Promise<void>{

        if (!this.room){
            console.log('room',this.content);
            return;
        }else{
            console.log('in room');
        }

        if ( !/免费发放微信群二维码/.test(this.message.room().topic())) {
        //if ( !/免费发放微信群二维码/.test(this.message.room().topic()) && !this.message.self()) {
            return;
        }else{
            console.log('in group');
        }

        if(this.sender.name() !== '熊小熊' || this.sender.name() !=='熊小赫'){
            //this.room.say(`"你没有权限@"${this.sender.name()}`);
            return;//不是超级用户
        }
        console.log('this.sender',this.sender.name());

        /*if (!this.message.self()){
            return;
        }else{
            console.log('none me');
        }*/
        /*if(){

        }*/

        if ( /^kick\@.*熊小赫/.test(this.content)) {
            console.log('match 熊小赫',this.content);
            return;
        }else{
            console.log('no ADMIN');
        }

        if ( /^kick\@.*熊小熊/.test(this.content)) {
            console.log('match 熊小熊',this.content);
            return;
        }else{
            console.log('no ADMIN');
        }


        let chatContent = this.content.substring(0,this.content.length - 1);
        console.log('first',chatContent);


        if (/^kick\@.*$/.test(chatContent)){
            //console.log('kick:',this.content);
            console.log('hah',chatContent);
            let tmpname = chatContent.match(/^kick\@(.*)$/);
            console.log('tmpname',tmpname);
            let lastname = tmpname[1];
            console.log('lastname',lastname);
            //console.log(name[1]);
            let tempContact = this.getRoomAlias(lastname);
            if (tempContact){
                //console.log(tempContact);
                try{
                    await this.room.del(tempContact);
                }catch(e){
                    console.log(e);
                }

            }
            //await this.room.del(tempContact);


        }else{
            console.log('no match');
        }
        return;


    }

    public async addFansFromRoom():Promise<any>{
        const length = memberList.length;
        console.log(`"the array length is ："${length}`);
        console.log(memberList);
        const from:Contact = this.sender;
        const name = this.sender.name();
        console.log(`"now was sended:"${SEND_NUMBER}`);
        if (SEND_NUMBER >= 200){
            console.log('the send number was finished today');
            return;
        }

        if (from && from.stranger()){//没有加过好友
            if(memberList.indexOf(name) === -1){//未
                try{// 执行过发送加好友请求的操作
                    const request = new FriendRequest();
                    let result = await request.send(from,addFansWord);
                    console.log(`"result is :"${result}`);
                    if (result){
                        SEND_NUMBER = SEND_NUMBER + 1;
                        console.log(`Request from ${name} is send succesfully!`)
                    }else{
                        SEND_NUMBER = SEND_NUMBER + 1;
                        console.log(`Request from ${name} failed to send!`)
                    }
                }catch(e)
                {
                    console.log('error:',e)
                }

                console.log("---------request--------");
            //console.log(request);
                memberList.push(name);
            }else{
                console.log(`${name}"-----the request was sended!"`);
            }
        }
        return;
    }

    public getWorkTime():boolean{
        let dateObj = new Date();
        let hour = dateObj.getHours() +  8 ;
        console.log('----it is hours:'+hour);
        if (hour >= 7){
            console.log('it is work time');
            return true;
        }else{
            console.log('it is not work time');
            return false;
        }
    }

    public getWorkHour():number{
        let dateObj = new Date();

        let hour = dateObj.getHours() ;
        let minutes = dateObj.getMinutes();
        let second  = dateObj.getSeconds();

        //let result = hour.toString()+minutes.toString()+second.toString();
        return second;
    }

    public async addFansToGroup():Promise<any>{
        //const friend = this.sender;
        try{
            const roomObj   = await Room.find({topic:/免费发放微信群二维码/});
            if (roomObj){
                console.log('invite: ');
                await roomObj.add(this.sender);
            }
        }catch(e){
            console.log('error:',e);
        }
        return;
    }


    public getRoomAlias(name:string):Contact{

        //this.room.member({name:lastname}|{alias:lastname});

        var nameContact = this.room.member({name:name});
        console.log('name',nameContact);
        if(!nameContact){
            return nameContact;
        }
        //console.log('alias',nameContact);
        nameContact = this.room.member({alias:name});
        if (!nameContact){
            return nameContact;
        }



    }

    public async getRoomMember():Promise<any>{

        try{
            const roomObj   = await Room.find({topic:/免费发放微信群二维码/});
            if (roomObj){
                console.log('invite: ');
                let mem = await roomObj.memberList();
                console.log(mem);
            }
        }catch(e){
            console.log('error:',e);
        }
        return;
    }

    /*public static getGroupNickNameFromContact = function(c:Contact) {
        return c['rawObj']['DisplayName'];
    }

    public async isAdmin():Promise<boolean>{

        if(this.message.self()){
          return true;
        }else{
            return false;
        }


        if(this.sender.name() === '熊小熊' || this.sender.name() === '熊小赫'){
            return true;
        }else{
            return false;
        }
    }*/


    /*
    public async isAdmin():Promise<boolean>{
        if(this.message.self()){
            return true;
        }else{
            return false;
        }

        if(this.sender.name() === '熊小熊'){
           return true;
        }else{
            return false;
        }

        if(this.sender.name() === '熊小赫'){
            return true;
        }else{
            return false;
        }
        return true;
    }*/







}

export default Wx;