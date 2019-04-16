nodejs的守护进程，可以让应用在后台执行，也就是我们关闭命令行或者执行ctrl+c，应用不会停止，除非使用pm2 stop server.js停止，开启pm2使用pm2 start server.js,重启pm2 restart server.js,pm2 list显示所有pm2进程。

但是重启会有延时，大型项目可能需要几秒，用户体验不好。本质上就是在pm2进程之下，创建一个node app的子进程。
