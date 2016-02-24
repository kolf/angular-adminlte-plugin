## 简介
  使用bootstrap、adminlte、angular搭建的常规单页管理平台常用组件demo。使用ES6进行开发，webpack进行构建。

  组件包括：左边菜单栏、树、日期(rangeDatePicker)、表格、表单(验证、行内编辑)、下拉列表(select2)、多tab标签、echart等

  
## 安装、运行
  
  - 安装`nodejs`  
  `webpack`工具依赖于nodejs，所以需要在本地提前安装[nodejs](http://npm.taobao.org/)环境(windows环境在安装后需要将安装目录加入环境变量)。
  - 安装`webpack`  
  `nodejs`安装完成后，在命令行执行：`npm install -g webpack`
  - 安装项目依赖  
  命令行找到工程根目录，执行`npm install`，通过npm安装需要的各种工具和第三方库
  - 运行本地开发环境  
  在工程根目录，命令行执行`npm run start`
  - 打包发布工程  
  在工程根目录，命令行执行`npm run build`

## 项目结构
  
````
    -- node_modules 
        // nodejs依赖组件，包括构建工具（babel、webpack）、
        // 开源框架（angular、bootstrap、adminlte、jquery等）  
    -- src // 项目根目录  
        |-- component // 本项目提供的组件  
            |-- common-core.js // 基本核心service  
        |-- lib // npm上不提供的第三方组件、框架  
        |-- business // 业务代码  
            |-- script
            |-- service
            |-- view
            |-- style
        |-- index.html // 入口页面  
        |-- main.js // angular入口js  
````

## 本地mock
  
  项目中加入了对ajax的mock支持。