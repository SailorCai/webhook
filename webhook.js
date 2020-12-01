const http = require('http')
const createHandler = require('github-webhook-handler');
const handler = createHandler({
  path: '/docker_deploy',
  secret: 'this_is_my_deploy'
})

const app = http.createServer((req, res) => {
  handler(req, res, err => {
    res.statusCode = 404;
    res.end('no such location');
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
  if(event.payload.ref === 'refs/heads/master') {
    console.log('deploy master...');
    run_cmd('sh', ['./deploy-daily.sh'], function(text) { console.log(text) })
  }
})

function run_cmd(cmd, args, callback) {
  var spawn = require('child_process').spawn;
  var child = spawn(cmd, args);

  var outStr = '';
  child.stdout.on('data', function(buffer) {outStr += buffer.toString()});
  child.stdout.on('end', function() {callback(outStr)})
}