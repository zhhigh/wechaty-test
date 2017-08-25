//import {HsyBotLogger} from "../datastore";
//import { Logger, LoggerConfig } from "log4ts";
//const logger = Logger.getLogger(`main`);

exports = module.exports = async function onScan(url, code) {

  /*switch (code) {
    case 408:
      //await HsyBotLogger.logDebug(`Please scan the QR code for URL ${url}. Code ${code}`);
      let loginUrl = url.replace('qrcode', 'l');
      require('qrcode-terminal').generate(loginUrl);
      break;
    case 200:
      console.log(`200 login confirmed`);
      break;
    case 201:
      console.log(`201 scanned, wait for confirm`);
      break;
    case 0:
      console.log(`0 init`);
      break;
    default:
      console.log(`Other code: ${code}`);
  }*/
  let loginUrl = url.replace('qrcode', 'l');
  require('qrcode-terminal').generate(loginUrl);
  console.log(url);

};
