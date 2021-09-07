image_version=`date +%Y%m%d%H%M`;
echo $image_version;
# cd vue2docker
git pull --rebase origin master;
docker stop vue2docker;
docker rm vue2docker -f;
docker build -t vue2docker:$image_version .;
docker images;
docker run -p 80:80 -d --name vue2docker -v /data/nginx/conf/nginx.conf:/etc/nginx/nginx.conf -v /data/nginx/log:/var/log/nginx -v /data/nginx/conf.d/default.conf:/etc/nginx/conf.d/default.conf -d vue2docker:$image_version;
# -v ~/docker-data/house-web/appsettings.json:/app/appsettings.json -v ~/docker-data/house-web/NLogFile/:/app/NLogFile   --restart=always
docker logs vue2docker;
#删除build过程中产生的镜像    #docker image prune -a -f
docker rmi $(docker images -f "dangling=true" -q)