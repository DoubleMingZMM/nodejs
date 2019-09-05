/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Daniel
 * @Date: 2019-09-05 13:31:57
 * @LastEditors: Daniel
 * @LastEditTime: 2019-09-05 15:09:54
 */
const Http = require('http');
const Cluster = require('cluster');
const CpuLength = require('os').cpus().length;

console.log('CpuLength===', CpuLength);

// 监听主进程退出
process.on('exit', (code) => {
  console.log(`主进程退出码: ${code}`);
});

if (Cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`);

  // 但是一开始的时候并没有衍生子进程，所以是空对象
  console.log('worker 类中的子进程的所有信息', Cluster.workers);

  for (let i = 0; i < CpuLength; i ++) {
    // 衍生一个工作进程，可以创建共享服务器端口的子进程
    const subPeocess = Cluster.fork();
    // 只针对某个特定的子进程，相比cluster.on('exit')会快
    subPeocess.on('exit', (code, signal) => {
      console.log('等同于Cluster.on("exit")，但是只针对特定子进程');
    });
    // 只针对某个特定的子进程，相比cluster.on('disconnect')会快,另外disconnect会比exit会快
    subPeocess.on('disconnect', (code, signal) => {
      console.log('等同于Cluster.on("disconnect")，但是只针对特定子进程');
    });
    // 但是这个不能在工作进程重触发，等同于cluster.on('online')
    subPeocess.on('online', () => {
      console.log('工作进程已上线');
    });
  }

  // 监听工作进程退出
  Cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 已退出`);
  });

  // 监听工作进程断开连接
  Cluster.on('disconnect', () => {
    console.log(`工作进程已断开连接`);
  });

  // 监听工作进程被衍生
  Cluster.on('fork', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 被衍生`);
  });

  // 跟踪 http 请求。
  let numReqs = 0;
  setInterval(() => {
    console.log(`请求的数量 = ${numReqs}`);
  }, 1000);

  // 对请求计数。
  function messageHandler(msg) {
    if (msg.cmd && msg.cmd === 'notifyRequest') {
      numReqs += 1;
    }
  }

  for (const id in Cluster.workers) {
    // 看是否链接
    console.log('1是否断开连接====》', Cluster.workers[id].isConnected());
    // 看是否死掉
    console.log('2是否死掉====》', Cluster.workers[id].isDead());
    
    Cluster.workers[id].on('message', messageHandler);
    // 关闭工作进程链接
    Cluster.workers[id].disconnect();
    // 看是否链接(已经断开连接)
    // console.log('2是否断开连接====》', Cluster.workers[id].isConnected());
    // 看是否死掉（已经死掉）
    // console.log('2是否死掉====》', Cluster.workers[id].isDead());
  }
} else {
  Http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world!');
  }).listen(9009);
  console.log(`工作进程 ${process.pid} 已启动`);

  // 有了子进程，不为空对象,在子进程中使用 cluster.worker 但是在主进程中使用 s 复数形式
  // console.log('worker 类中的子进程的所有信息', Cluster.worker);

  // 通知主进程接收到了请求。
  process.send({ cmd: 'notifyRequest' });

  // 这句话可以让工作进程退出
  // process.exit(1);
}
