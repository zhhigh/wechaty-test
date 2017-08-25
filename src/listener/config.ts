   /*   V0.001 2017-07-26  修改了haoshiyou_bot,去掉log4ts,形成初步能跑的框架
     V0.002 2017-07-27  完成自动加粉（问题还 比较多）
     V0.003 2017-07-28  完成发图片
     V0.004 2017-07-29  完成发二维码，加入发送消息延迟限制，9秒
                        完成工作时间非工作时间限制
     V0.005 2017-08-14  完成指令踢人[bug:如果该了群名字，找不到对应的contact]
                        完成指令加群
     V0.006 2017-08-17  docker支持redis
                        container commnunication each other at same host
     V0.007 2017-08-18  group msg send



    http://www.yunthink.cn/  学习这个打劫，换成积分，

      proress            私密码自动加群
                         自动踢人
                         加人
                         次数限制
                         自动加人
                         自动群发
                         付费入群


      BUG -1             公众号无法识别
      BUG -2             对方是机器人无法识别，导致双方不停互发
      BUG -3             加入群聊消息未过滤
      BUG -4             自动邀请入群，会出现重复发消息的情况

      memo               1、热加载的class 变量，如果在其他文件里面，需要重新启动docker加载
                            否则，编译报错
                         2、加了好友和未加好友的rawobj不一样
                         3、ContactFlag  个人+好友 = 3   废弃，没用
                                         好友+公众号=2
                            ContactFlag 未在rawObj里面，说明不是好友

 https://github.com/mcollina/mosca  消息队列
DataStructure----------
 [message]   MsgType: 49  公众号发出来的
                      10000 扫码入群消息
                      10001

 MMIsChatRoom: false,   可以通过这个过滤公众号和私聊信息，即：群聊为ture,其余均为false


    warn:06:39:56 WARN PuppetWebFirer fireRoomJoin() reject() inviteeContactList: WARN, inviterContact: PuppetWebFirer fireRoomJoin() reject() inviteeContactList: %s, inviterContact: %s  vahqoxgz
 http://www.w3school.com.cn/jsref/jsref_getTimezoneOffset.asp
 nodejs 编码规范
 http://ourjs.com/detail/node-js%E7%BC%96%E7%A0%81%E8%A7%84%E8%8C%83%E6%8C%87%E5%8D%97%E6%95%99%E7%A8%8B-%E6%95%99%E4%BD%A0%E4%BC%98%E9%9B%85%E5%9C%B0%E5%86%99javascript%E4%BB%A3%E7%A0%81


 docker exec -it xiaoxiong bash
 docker commit 698 learn/ping
 698 container id,learn/ping 重新命名

 出现pending的时候，一般要用await 
* */




/* await 的好文章  http://cnodejs.org/topic/5640b80d3a6aa72c5e0030b6
* */
export const WelComeMsg = `
═════ 熊小熊 ═════
1、敲1免费微信群二维码(延迟6-12秒发送)
2、国外顶级手机定位监控软件mspy
3、*微&-信-&B*-&O*-&T*
4、美国日本VPS
5、Bot体验群，暗语：wechat,我拉你入群
═════ 熊小熊 ═════
`;

export const DefaultReplyMsg = `请私信沟通！`;

export const greetingsMsg = `
你好，谢谢你加我们群!
`;


export const addFansWord = `
想代理你们的产品!
`;

export const HOUR_OFFSET = 8 ;


export const IMAGE_PATH   = '/bot/meizitu/';
export const IMAGE_QRCODE = '/bot/qr/';
export const ROOM_NAME    ='免费发放微信群二维码';
export const ROOM_ADMIN   ='群主熊小熊';
export const ADMIN1       ='熊小熊';
export const ADMIN2       ='熊小赫';

//export let GLOABL_JOINMSG_TYPE:boolean = false;/*加入离开等消息*/


/*   \/bot 是docker运行挂载的路径，要把图片都放在\/bot下面   */
//export const IMAGE_PATH = '/bot/meizitu/';


   /*
    ╒═════娱乐════╕
    ├╳╳╳╳╳╳╳╳╳╳╳┤
    ├╳点歌╳搜图╳机器人╳┤
    ├╳╳╳╳打赏夏天╳╳╳┤
    ├╳╳╳╳╳╳╳╳╳╳╳┤
    ╞════群═聊════╡
    ├╳╳╳╳╳╳╳╳╳╳╳┤
    ├╳群规╳新人入群欢迎╳┤
    ├╳╳好友申请通过╳╳╳┤
    ├╳╳╳撤回消息显示╳╳┤
    ├╳╳╳╳╳╳╳╳╳╳╳┤
    ╞════其══它═══╡
    ├╳╳购买微信号请加╳╳┤
    ├╳╳╳date7788╳╳╳╳┤
    ├╳╳╳╳╳╳╳╳╳╳╳┤
    ╘═════结束════╛
   * */