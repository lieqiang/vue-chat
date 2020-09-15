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
一个类微信的聊天App，支持实时聊天，支持发送文本、表情、图片，更改用户头像等;
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
    - koa2
    - mongoDB
    - mongoose
    - socket.io
    - validator
## 项目准备
  - 安装Node.js
  - 安装mongoDB
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

## 安装依赖、运行
- 客户端
```
cd chatClient
npm install
npm run serve
```
- 服务端
```
cd chatServer
npm install
node app.js

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
### License
[the MIT license](https://github.com/lieqiang/vue-chat/blob/master/LICENSE)
