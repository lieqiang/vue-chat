<p align="center">
  <a href="https://github.com/koajs/koa">
    <img src="https://img.shields.io/badge/koa-2.11.0-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.6.11-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/youzan/vant">
    <img src="https://img.shields.io/badge/vant-2.8.0-brightgreen.svg" alt="vant">
  </a>
  <a href="https://github.com/lieqiang/vue-chat/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="license">
  </a>
</p>

## 项目介绍
一个类微信的聊天App，支持实时发送文本、表情、图片，更改用户头像等;
## 项目技术
  - 前端
    - Vue.js
    - Vue-router
    - Vuex
    - Vue-socket.io
    - Sass
    - Axios
    - Vant
    - Better-scroll
  - 后端
    - JWT
    - koa2
    - mongoDB
    - mongoose
    - socket.io
    - validator

## 已实现功能
- 注册
- 登录（JWT）
- 添加好友
- 通讯录
- 聊天发送文本、表情、图片消息
- 修改个人信息(昵称、性别、个性签名等)
- 上传头像
- 实时消息角标提醒
- 聊天界面消息实时更新
## 项目准备
  - 安装[Node.js](https://nodejs.org/zh-cn/)
  - 安装[mongoDB](https://www.mongodb.com/)
### 安装mongoDB问题
[the domain,user name and/or password are incorrect.remember to use"." for the domain if the account is on the local machine](https://blog.csdn.net/weixin_45885232/article/details/105286789?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-4&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-4)
### 连接mongoDB问题
[MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017](https://blog.csdn.net/forljnlearning/article/details/106899784)
## 项目目录
- 客户端
```
|-- chatClient
|   |-- .browserslistrc
|   |-- .editorconfig
|   |-- .env.development
|   |-- .env.production
|   |-- .eslintrc.js
|   |-- .gitignore
|   |-- babel.config.js
|   |-- package-lock.json
|   |-- package.json
|   |-- vue.config.js
|   |-- yarn.lock
|   |-- public
|   |   |-- favicon.ico
|   |   |-- index.html
|   |-- src
|       |-- App.vue
|       |-- AppMain.vue
|       |-- config.js
|       |-- main.js
|       |-- permission.js
|       |-- api
|       |   |-- message.js
|       |   |-- upload.js
|       |   |-- user.js
|       |-- assets
|       |   |-- face
|       |-- components
|       |   |-- Add
|       |   |   |-- index.vue
|       |   |-- face
|       |   |   |-- index.vue
|       |   |-- SvgIcon
|       |   |   |-- index.vue
|       |   |-- Tab
|       |       |-- index.vue
|       |-- filters
|       |   |-- index.js
|       |-- icons
|       |   |-- index.js
|       |   |-- svg
|       |-- mixins
|       |   |-- width.js
|       |-- router
|       |   |-- index.js
|       |-- store
|       |   |-- actions.js
|       |   |-- getters.js
|       |   |-- index.js
|       |   |-- mutations.js
|       |   |-- state.js
|       |-- styles
|       |   |-- face.scss
|       |   |-- index.scss
|       |   |-- mixin.scss
|       |-- utils
|       |   |-- auth.js
|       |   |-- face.js
|       |   |-- index.js
|       |   |-- request.js
|       |   |-- token.js
|       |-- views
|           |-- AddressBooks.vue
|           |-- FriendDetail.vue
|           |-- Home.vue
|           |-- NewFriends.vue
|           |-- Search.vue
|           |-- SearchDetail.vue
|           |-- SendValidate.vue
|           |-- Signin.vue
|           |-- Signup.vue
|           |-- chat
|           |   |-- index.vue
|           |   |-- msgItem
|           |       |-- index.vue
|           |-- errorPage
|           |   |-- 404.vue
|           |-- Me
|               |-- EditAvatar.vue
|               |-- EditNickname.vue
|               |-- EditSex.vue
|               |-- EditSignature.vue
|               |-- Me.vue
|               |-- PersonalInfo.vue
```

- 服务端

```
|-- chatServer
    |-- .gitignore
    |-- app.js
    |-- index.html
    |-- package.json
    |-- yarn.lock
    |   |-- launch.json
    |-- app
    |   |-- api
    |   |   |-- v1
    |   |       |-- message.js
    |   |       |-- token.js
    |   |       |-- upload.js
    |   |       |-- user.js
    |   |-- config
    |   |   |-- config.js
    |   |-- models
    |   |   |-- friendly.js
    |   |   |-- message.js
    |   |   |-- user.js
    |   |-- validator
    |       |-- validator.js
    |-- core
    |   |-- db.js
    |   |-- http-exception.js
    |   |-- init.js
    |   |-- lin-validator-v2.js
    |   |-- socket.js
    |   |-- utils.js
    |-- middlewares
    |   |-- auth.js
    |   |-- exception.js
    |   |-- multer.js
    |-- public
    |   |-- uploads
    |-- static
```
## 项目截图
![添加好友](http://47.107.135.64/images/%E6%B7%BB%E5%8A%A0%E5%A5%BD%E5%8F%8B.gif)

![发送消息](http://47.107.135.64/images/%E5%8F%91%E9%80%81%E6%B6%88%E6%81%AF.gif)

## 安装依赖、运行
- 客户端
```javascript
cd chatClient
npm install
npm run serve
// App running at: http://localhost:8080/
```
## 服务端
### mongoose连接数据库
```
const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://127.0.0.1:27017/wechat', { useNewUrlParser: true, useUnifiedTopology: true }, function(err, res) {})
```
### 连接socket.io
```javascript
const app = new Koa()
const server = require('http').Server(app.callback())
const io = require('socket.io')(server)
io.on('connection', (socket) => {
  socket.on('join', (params) => {
    // 业务代码
  })
  socket.on('agreeAdd', (params) => {
    // 业务代码
  })
})
```
### 启动
```javascript
cd chatServer
npm install
node app.js
// server.listen at 8090
```
### License
[the MIT license](https://github.com/lieqiang/vue-chat/blob/master/LICENSE)

### 最后
如果对你有帮助，记得star一下哟^_^

