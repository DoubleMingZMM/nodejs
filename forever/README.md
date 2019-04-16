nodejs的守护进程，可以让应用在后台执行，也就是我们关闭命令行或者执行ctrl+c，应用不会停止，除非使用forever stop server.js停止，开启forever使用forever start server.js,重启forever restart server.js,forever list显示所有forever进程。

但是重启会有延时，大型项目可能需要几秒，用户体验不好。本质上就是在forever进程之下，创建一个node app的子进程。
