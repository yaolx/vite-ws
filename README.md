
## 全新vite3.0体验

脚手架搭建参考[cra-template-react-boat](https://github.com/yaolx/cra-template-react-boat)

## react18：Suspense + lazy异步加载

通过import做异步加载

`const Home = lazy(() => import('@/page/home'))`

## react-router 6.0

useRouters构造路由

## json-server

json-server做mock请求，接口定义符合RESTful API 规范

## concurrently

concurrently同时启动前端、后端2个服务

## vitest单元测试框架

[官方地址](https://cn.vitest.dev/)

## 命令介绍

1. yarn mock

本地开发，启动mock请求

2. yarn build

构建生产环境

3. yarn server

构建后，用dist目录的静态资源启动服务，并开启mock

4. yarn lint

typescript、eslint静态代码检查

5. yarn ws

启动websocket服务

## 注意事项

1. vite 秒启动，但是第一次访问页面会比较慢，会生成缓存资源，下一次打开的时候会很快
2. 如果手机端想跟pc端同步数据，请将服务地址的localhost改成ip

