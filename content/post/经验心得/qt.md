+++
date = '2025-08-08T16:36:26+08:00'
draft = false
title = '因为qt的问题，害得我kde桌面都不能用了，改用gnome桌面'

+++

## 2024.3.7

弄了好几天，才勉强把qt的问题给解决，却又不急着换回kde桌面了。

qt的问题主要有两个：

1.   qt5和qt6之间的冲突。

2.   so不同版本的控制。

- 先说so不同版本的控制。

so不同版本的后缀不同，so后面第一个后缀是大版本，是核心，例如so.1或so.2。后面的后缀是小版本，大部分时候不用去管。我就去爱管，结果不但浪费了大量时间，还引发了更严重的问题。

so的大版本控制得比较好，可以同时存在，不必考虑是删除这一个，还是留下这一个，不存在这种选择性困难。完全可以同时安装。例如：一个需要so.74，一个需要so.73，完全可以把74版和73版本都装上。

小版本不讲究控制，程序只知去调用大版本，却不知大版本是链接到了哪个小版本。例如：A程序和B程序都调用到so.73，但A程序需要的是so.73.1，而B程序需要的是so.73.2。假设现在只安装了so.73.1，A程序因此运行良好，B程序不是不能运行，只是会有些瑕疵，比如说窗口最大化后不见右上角的那些控制按钮了。

**紧记：删除so前一定要先备份一段时间，不然想再找回就麻烦了。一个很小的so都可能引发连锁反应，造成系统雪崩式的灾难。**

-   再说qt5和qt6之间的冲突。

这个没什么好的方案。两者之间最好只装一个，要么qt5，要么qt6。如果硬要一起装，就只装一个系统级，另一个用户级。两者在系统级层面混淆在一起，将会是灾难性的。

我把qt6卸载后装在/home/yoli2/qt/qt6

为什么不卸载qt5？因为与qt5关联在一起的程序太多了，卸载的时候要一起卸载。卸载qt6的话，先把那些一起卸载掉的程序的名字记下来，以后再装上。

-   环境变量的配置

原来我是在/etc/profile和~/.xprofile里面都有配置qt的环境变量，后来发现最好还是只在/etc/profile文件里配置最好。

```
# qt
# retext需要再加上qt6的插件路径，否则打开retext后不能输入汉字。这解决方法在网上找不到答案，纯粹是自己实验出来。
# ----------------------------------------------------qt----------------------------------------------------
export XDG_RUNTIME_DIR=~/xdg/runtime
export RUNLEVEL=3
export QT_QPA_PLATFORM=xcb
#export QT_QPA_PLATFORM=wayland
export QT_QPA_FONTDIR=/opt/fonts
export QT_AUTO_SCREEN_SCALE_FACTOR=0
export QT_DEBUG_PLUGINS=1
#export QT_LOGGING_RULES=qt.qpa.*=true
#export QSG_INFO=1
#export QT_QPA_EGLFS_DEBUG=1
# ----------------------------------------------------qt6----------------------------------------------------
#export PATH=/home/yoli2/qt/qt6/bin:$PATH
#export PKG_CONFIG_PATH=/home/yoli2/qt/qt6/lib/pkgconfig
#export LD_LIBRARY_PATH=/home/yoli2/qt/qt6 # 指定共享库的加载路径，LD_LIBRARY_PATH优先于path环境变量。
#export QT_PLUGIN_PATH=/home/yoli2/qt/qt6/plugins
#export QT_QPA_PLATFORM_PLUGIN_PATH=/home/yoli2/qt/qt6/plugins
#export QT_QPA_PLATFORMTHEME="qt6ct"
# ----------------------------------------------------qt5----------------------------------------------------
export QT_SELECT=5
export Qt5_DIR=/lib/cmake/Qt5
export LD_LIBRARY_PATH=/lib
export QT_PLUGIN_PATH="" # 把原来的清除，否则容易混淆在一起。
export QT_PLUGIN_PATH=/lib/qt/plugins
export QT_QPA_PLATFORMM_PLUGIN_PATH="" # 把旧的清除，否则容易混淆在一起。
export QT_QPA_PLATFORMTHEME="qt5ct"
```

### 最终解决方案

/etc/profile

```
# qt
# retext需要再加上qt6的插件路径，否则打开retext后不能输入汉字。这解决方法在网上找不到答案，纯粹是自己实验出来。
# ----------------------------------------------------qt----------------------------------------------------
export XDG_RUNTIME_DIR=~/xdg/runtime
export RUNLEVEL=3
export QT_QPA_PLATFORM=xcb
#export QT_QPA_PLATFORM=wayland
export QT_QPA_FONTDIR=/opt/fonts
export QT_AUTO_SCREEN_SCALE_FACTOR=0
export QT_DEBUG_PLUGINS=1
#export QT_LOGGING_RULES=qt.qpa.*=true
#export QSG_INFO=1
#export QT_QPA_EGLFS_DEBUG=1
# ----------------------------------------------------qt6----------------------------------------------------
alias setqt6="export PATH=/bin/qt6:/lib/qt6/bin:$PATH && export LD_LIBRARY_PATH=/lib:/lib/qt6 && export QT_PLUGIN_PATH=/lib/qt6/plugins && PKG_CONFIG_PATH=/lib/qt6/pkgconfig && export QT_QPA_PLATFORMTHEME="qt6ct""
# ----------------------------------------------------qt5----------------------------------------------------
alias setqt5="export PATH=/bin/qt5:$PATH && export LD_LIBRARY_PATH=/lib && export QT_QPA_PLATFORMTHEME="qt5ct" && export QT_PLUGIN_PATH="" && export QT_QPA_PLATFORMM_PLUGIN_PATH="" && export PKG_CONFIG_PATH="" "
export PATH=/bin/qt5:$PATH
export LD_LIBRARY_PATH=/lib
#export QT_SELECT=5
#export Qt5_DIR=/lib/cmake/Qt5
#export QT_PLUGIN_PATH=""
#export QT_PLUGIN_PATH=/lib/qt/plugins
```

-   解决思路：把不同版本的qmake分开放，给不同版本的设置起个别名。

    在/bin目录下新建两个目录：qt5和qt6。

    把/bin下面的qmake给移走。移走前用`qmake --version`查看是哪个版本。

-   测试结果：qt5和qt6程序甚至可以同时运行（不知是什么原因造成的），偶尔有不能运行的只用一个版本也不能运行。

## 2024.3.8

今天改了一下~/.xprofile文件，在里面增加了一段：

```
# py
export LD_LIBRARY_PATH=/home/yoli/.local/lib/python3.11/site-packages/PyQt6/Qt6/lib:$LD_LIBRARY_PATH
```

然后把系统目录下的pyqt6给卸载了，暂时先只用用户目录下的pyqt6，这样配置起来更轻松。

```
sudo pip3 uninstall pyqt6
pip3 install pyqt6
```

这样配置后，重启终端或`source ~/.xprofile`，一些原本不能运行的qt6程序就又可以运行了。

这样配置后有一点小bug：每次用setqt5或setqt6改变配置后，都需要重启终端或`source ~/.xprofile`，否则那些原本不能运行的qt6程序就又不能运行了。

