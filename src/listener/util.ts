
//const HOUR_OFFSET = 8 ;
import {HOUR_OFFSET} from "./config";

export class Util{

    public getRandomFromArrayV1():number {
        //let randomList:number[] = [6000,7000,8000,9000,10000,11000,12000,13000,14000,15000];
        let randomList:number[] = [6000,7000,8000,9000,10000,11000,12000];
        let length              = randomList.length;
        let random      = Math.random() *( length - 1 ) + 1;
        let temp        = Math.round(random);
        return randomList[temp-1];
    }

    public getWorkTimeV1():boolean{
        let dateObj = new Date();
        let hour = dateObj.getHours() +  HOUR_OFFSET ;
        if (hour >= 7){
            console.log('it is work time');
            return true;
        }else{
            console.log('it is not work time');
            return false;
        }
    }

    public getPicPathV1(filePath:string):string{
        var fileName = "";
        fs.readdir(filePath,function(err,files){
            if(err){
                return console.error(err);
            }

            const length = files.length;
            console.log(`"meizitu files count:  "${length}`);
            var random:number = getRandomFromArray(1,length);
            console.log(`"random is : "${random}`);

            if (random > length){
                random = random - length;
            }

            fileName = files[random];
            fileName = filePath + fileName;
            console.log(`"filename is : "${fileName}`);
            replyPic(message,fileName);
            return fileName;
            /*files.forEach(function(file){
             const length = files.length;
             console.log(`"meizitu files count:  "${length}`);
             //console.info(file);
             });*/
        });

        console.log(`"filename is : "${fileName}`);
        return fileName;

    }

}

export default Util;

/**/