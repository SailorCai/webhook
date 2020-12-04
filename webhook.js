/*
 * @Author: SailorCai
 * @Date: 2020-12-01 23:10:43
 * @LastEditors: SailorCai
 * @LastEditTime: 2020-12-02 11:17:38
 * @FilePath: /webhook/webhook.js
 */
const http = require('http')
const createHandler = require('github-webhook-handler');
const handler = createHandler({
  path: '/docker_deploy',
  secret: 'this_is_my_deploy'
})

const app = http.createServer((req, res) => {
  handler(req, res, err => {
    res.statusCode = 404;
    res.end({
      code: 0,
      sucess: true,
      data: {
        userName: 'sailorCai',
        userId: 'fdnjj1kxkig6d2d6g62f6gfd',
        slogan: '功夫再高，也怕菜刀！',
        avatar: 'http://115.159.95.246/blog/assets/img/avatar.jpg'
      },
      message: '小伙，接口通了！'
    });
  })
}).listen(7777, () => {
  console.log('webhook listen at port 7777');
});

handler.on('error', err => {
  console.error('Error', err.message)
})

handler.on('push', event => {
  console.log('Received a push event for $s to $s ', event.payload.repository.name, event.payload.ref)
  // 分支判断
  console.log('event.payload.ref', event.payload.ref);
  if(event.payload.ref === 'refs/heads/gh-pages') {
    console.log('deploy master...');
    run_cmd('sh', ['./deploy-daily.sh'], function(text) { console.log(text) })
  }
})

function run_cmd(cmd, args, callback) {
  var spawn = require('child_process').spawn;
  var child = spawn(cmd, args);

  var outStr = '';
  child.stdout.on('data', function(buffer) {
    // outStr += buffer.toString()
    callback(buffer.toString());
  });
  child.stdout.on('end', function() {callback(outStr)})
}