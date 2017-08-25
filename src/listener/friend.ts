import {Contact} from "wechaty";


exports = module.exports = async function onFriend(contact, request) {
  let name = contact.name();
  console.log(`"auto accepted from: "${name}`);
  if (request) {  // 1. request to be friend from new contact
    let result = await request.accept();
    if(result){
      contact.say('hello!');
      console.log('auto accepted for ' + name + ' with message: ');
    }else{
      console.log('auto accepted failed!');
    }
  }else{
    console.log(`new friendship confirmed with ${contact.name()}`)
  }
}
