/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Daniel
 * @Date: 2019-09-05 11:36:40
 * @LastEditors: Daniel
 * @LastEditTime: 2019-09-05 12:29:43
 */
const spawn = require('child_process').spawn;
const ls = spawn('ls', ['-lh', 'usr'], { cwd: '/' });

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
