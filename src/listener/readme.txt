-----------------bug-------------------------------
bug#1  redis presistent
solve : docker run --name redis -v /opt/redis/data:/data -d redis
key   : use -v parameter




-----------------docker----------------------------
2017-08-17#####support ioredis
1、pull the lastest verson
2、docker run -ti -e --rm --volume="$(pwd)":/bot --name test zixia/wechaty main.ts
3、 docker exec -it test bash
4、cd /wecahty/node_modules
5、npm install ioredis
6、cd /wecahty/bin/
7、vi entrypoint.sh
8、add NODE_PATH after PATH
   export NODE_PATH=/wechaty/node_modules/:/usr/lib/node_modules
9、docker commit df25033d0893 zhhigh/wechaty
   df25033d0893 is container id

2017-08-17####
container communication each other at same host



---------wechat resource-----------------
https://github.com/weechatfly
https://github.com/asLody
https://github.com/chinarobotlab/wxchat-pc
https://github.com/JeffreySu/WeiXinMPSDK
http://blog.csdn.net/wulex/article/details/73188834  使用微信PC端的截图dll库实现微信截图功能

https://github.com/Allen-Wei/Alan.WeChat  *****

https://www.nuget.org/packages?q=wechat *****


https://github.com/ChairmanJiangZemin/WechatCipher  xposed wechat

https://anhkgg.github.io/wechat-multi-pc/  微信多开
https://etenal.me/archives/844 dll注入浅析
https://zabery.github.io/2017/03/12/dll-hook-api-hook/ DLL注入和API拦截
http://www.infocool.net/kb/Webcat/201703/305441.html 如何在逆向工程中 Hook 得更准 - 微信屏蔽好友&群消息实战


###andriod ############
https://github.com/shawn0606/WeChatAutoReply  用这个方法xposed
https://github.com/geeeeeeeeek/WeChatLuckyMoney  抢红包
https://github.com/veryyoung  牛人
https://github.com/weechatfly 牛人

###########wechat ios hook #############
https://github.com/yulingtianxia/FishChat






--------------redis---------------------
password :Wechat@139.com



-------------skills--------------------------
 1、container communication each other at same host:

  redis example:
  A:  docker run --name redis -d redis
  B:  docker run -ti -e --rm --volume="$(pwd)":/bot --link redis:db --name wechat zhhigh/wechaty main.ts

  key notes:
  --link redis(it's container name)



------------------------code---------------------------------
try{
        await setTimeout(() => {
            console.log('delay-----');
            wxObj.replayAll();
        }, random);
    }catch(e)
    {
        console.log('error',e);
    }



--------------spider------------------------------------------
install pip
1、yum -y install epel-release
2、yum -y install python-pip
3、yum clean all

install dependencies
1、yum install gcc libffi-devel python-devel openssl-devel
2、yum groupinstall -y development
3、yum install libxslt-devel
4、 yum -y install python-pip

install scrapy
5、pip install scrapy

spider crontab
10 17 * * * /opt/spider/meizitu/fun/spiders/a.sh >>/tmp/scrapy.log


小说爬虫：
https://github.com/lylllcc/biquge


--------------nodejs--------------------------------
 1、yum install epel-release -y
 2、 rpm -ivh https://kojipkgs.fedoraproject.org//packages/http-parser/2.7.1/3.el7/x86_64/http-parser-2.7.1-3.el7.x86_64.rpm

