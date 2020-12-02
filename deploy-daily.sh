#!/bin/bash
# 确保脚本抛出遇到的错误
set -e
# 输出日志
echo 'begin deploy blog'
pwd
docker ps
# 停掉容器
docker stop blog_v1
# 删除容器
docker rm blog_v1 
# 进入到博客代码目录
cd ../blog/code/
# 拉取最新代码
git pull
# 回到Dockerfile目录
cd ..
# 重新定制镜像
docker build -t blog:latest .
# 启动镜像
docker run -p 80:80 --name blog_v1 -d blog:latest