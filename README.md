# spa

# Status
[![Build Status](https://travis-ci.org/mhvs/spa-webpack.png)](https://travis-ci.org/mhvs/spa-webpack)

# 一个简单的SPA骨架

- 为了无需配置后端服务器即可打开,使用hash路由.

- `#login` 如果跳转到login页面, 随意输一个数字, 点登录即可

- 基于promise模拟了一个验证用户登录态的接口, 每次刷新登录页,404页以外的页面会调用一次, 该接口有一定几率验证成功, 一定几率验证失败.

## 可使用的路由
- `#login`
- `#404`
- `#group/1/users`
- `#/user/1`
- `#htmltest` 一个html文件的模块
- `#group/1/user/1` 会被重定向到 `#/user/1`

## 按需加载
使用 `component` 模块打包在app.js里
使用 `getComponent` 模块打包在单独的js里, 当模块使用时才加载该模块

## html模块
`#htmltest` 模拟了使用html文件作为模块的情况
- 这里假设了只有html和js的component两种情况. 
- 因为没有考虑如何处理html模块(如vue处理为js, 或者作为html模板), 这里html作为纯文本处理

## Build Setup

``` bash
# install dependencies
npm install

# run lint
npm run lint

# run unit tests
npm run unit

# run all tests
npm test

# upload coverage info to coveralls
npm run coveralls
```
