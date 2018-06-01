# zicoder

一些用于日常开发的脚本命令集合(主要针对java语言和一些日常部署项目使用)

## 使用

### 安装
```bash
 npm install zicoder -g

```

### 命令

zicoder [options] [path]

* path: 必须写的目标文件路径，如果是文件夹，会自动查找其中所有的java文件并执行相关操作

* -c：向文件中写入向其他类复制非null的属性

* -t: 向文件中写入toMap方法，将类属性塞入map中

* -f:向文件中写入fromMap方法，从map中收取类的属性

* -p: 将类属性按照 `"a","b"`的形式输出到屏幕

* -r: 向文件中写入从list集合中抽取属性的方法

* --func-name: 指定函数名

* --value-type: 设置map的value类型 `String|Object`

* -l [number]：指定从哪一行写入 

* -h: 获取帮助