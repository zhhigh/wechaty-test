var RedisDb = require('ioredis');

export class Redis{
    let redis = null;
    constructor(port,host,pwd){
        try{
            redis = new RedisDb(port,host,{password:pwd});
        }catch(e){
            console.log('error',e);
        }
    }

}

export default Redis;


