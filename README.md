<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description
设计并实现一个基于ios 平台的在线书城手机软件，系统包括后台服务器和前台客户端。后台服务器为基于 web 的图书管理系统，负责电子书库的上传和管理，前台客户端为基于 ios 平台的iphon&、itoutipad等移动设备的电子书店应用程序，负责电子书的购买、下载、阅读等。
具体功能如下:
1)书库管理:新增、修改或删除书籍分类，新书上架和编辑简介，书籍的价格修改限时免费和下架。
2)用户管理:系统管理员可以新增、修改或删除二级管理员，并设置其管理员权限!
实现会员管理。
3)购物车管理:用户可以通过推荐、免费、分类、搜索浏览在线书城，并可以下载和购买电子书。
4)我的书架:用于管理和阅读已下载书籍、以及读书心得的发布。
5)数据管理:管理员可以导出书库中的书籍下载和浏览记录。

数据库表：
书籍表：bookCell
用户表：user
购物车表：chart
我的书架表：mineBook
书籍类别表：bookCategory
浏览记录表：history

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

