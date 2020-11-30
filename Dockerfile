FROM node:10-alpine
# 移动当前目录的文件到容器的/app/目录下
ADD . /app/
# 进入到app目录下面， 类似cd
WORKDIR /app
# 安装依赖
RUN npm install
# 对外暴露的端口
EXPOSE 3000
#程序启动脚本
CMD ["node", "webhook.js"]
