import {Room, Contact ,Message} from "wechaty";
//const magicChar = String.fromCharCode(8197);
//exports = module.exports = async function onRoomJoin(inviteeList:Contact[], inviter:Contact,message:Message){
exports = module.exports = async function onRoomJoin(room, inviteeList, inviter){

   // console.log(`${inviter.name()}"someone join the room!"`);
    try{
        //let room = message.room();
        if ( /免费发放微信群二维码/.test(room.topic())){
            let msg = `欢迎新群友:@${inviter.name()},发送'功能'获取更多精彩`;

            setTimeout(() => {
                console.log('someone join the room');
                room.say(msg);
            }, 8000);
        }
    }catch(e){
        console.log('error:',e);
    }
}