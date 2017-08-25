import {Room, Contact, Message, MsgType,FriendRequest,MediaMessage} from "wechaty";


export class GroupCtrl{

    private  message:Message;
    //private room   :Room;
    //private sender :Contact;
    //private content:string;
    constructor(msgObj:Message){
        this.message = msgObj;
        //this.room    = this.message.room();
        //this.sender  = this.message.from();
        //this.content = this.message.content();
    }

}
export default GroupCtrl;