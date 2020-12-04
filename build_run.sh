#!/bin/bash

# 停掉容器并删除镜像
docker stop blog_hook
docker rm blog_hook

# 重新定制镜像，并启动镜像
docker build -t blog_hook:v1 .
docker run -p 3000:7777 --name blog_hook -d blog_hook:v1