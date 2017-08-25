docker run -ti -e --rm --volume="$(pwd)":/bot --name xiaoxiong zixia/wechaty:0.8.2 main.ts
docker run -ti -e --rm --volume="$(pwd)":/bot --name test zixia/wechaty main.ts
docker run -ti -e --rm --volume="$(pwd)":/bot --name test zhhigh/wechaty main.ts
docker run -ti -e --rm --volume="$(pwd)":/bot --link redis:db --name wechat zhhigh/wechaty main.ts

欢迎新人:阳阳阳<span class="emoji emoji1f319"></span>
小贴士:发送'功能'获取更多精彩


-----------redis----------------------------
#docker run --name  wechat-redis -d redis -v /opt/redis/data:/data -p 6379:6379
#docker run --name  wechat-redis -d -v /opt/redis/data:/data -p 6379:6379
docker run --name  wechat -d redis -v /opt/redis/data:/data --appendonly yes
docker run -d redis -v /opt/redis/data:/data 
 docker run --name wechat-redis -d redis redis-server -v /opt/redis/data:/data --appendonly yes 


docker run --name wechat -d zhhigh/redis -v /opt/redis/data:/data

docker run --name redis -p 172.17.0.3:6379:6379 -d zhhigh/redis
docker run --name redis -p 6379:6379 -d zhhigh/redis
docker run --name redis -v /opt/redis/data:/data -d redis



linux redis redis@139


docker build -t zhhigh/wechaty .

docker network inspect bridge
