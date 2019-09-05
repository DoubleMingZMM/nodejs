/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Daniel
 * @Date: 2019-09-04 17:57:38
 * @LastEditors: Daniel
 * @LastEditTime: 2019-09-04 18:33:39
 */
const async_hooks = require('async_hooks');
const fs = require('fs');
// console.log('global.asyncId:', async_hooks.executionAsyncId());  // global.asyncId: 1
// console.log('global.triggerAsyncId:', async_hooks.triggerAsyncId()); // global.triggerAsyncId: 0
// fs.open('../http.js', 'r', (err, fd) => {
//     console.log('fs.open.asyncId:', async_hooks.executionAsyncId()); // fs.open.asyncId: 7
//     console.log('fs.open.triggerAsyncId:', async_hooks.triggerAsyncId()); // fs.open.triggerAsyncId: 1
// });

const asyncHook = async_hooks.createHook({
  init(asyncId, type, triggerAsyncId, resource) { 
    fs.writeSync(1, `${type}(${asyncId}): trigger: ${triggerAsyncId} execution: ${eid}\n`);
  },
  before(asyncId) {
    console.log(asyncId);
  },
  after(asyncId) {
    console.log(asyncId);
  },
  destroy(asyncId) { 
    console.log(asyncId);
  },
  promiseResolve(asyncId) {
    console.log(asyncId);
  }
});
asyncHook.enable();   //通过 enable 函数开启钩子功能
