
    let dateObj = new Date();

    let hour = dateObj.getHours() ;
    let minutes = dateObj.getMinutes();
    let second  = dateObj.getSeconds();

    let result = hour.toString()+minutes.toString()+second.toString();
    console.log(result);

