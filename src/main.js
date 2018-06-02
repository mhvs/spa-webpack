import rest from './middleware/rest'
import history from './middleware/history'
import rewrite from './middleware/rewrite'
import authFilter from './middleware/authFilter'
import router from './middleware/router'

import Login from './page/Login'
import Page404 from './page/404'
import GroupUsers from './page/GroupUsers'
// import User from './page/User'

import SPA from './SPA'

const app = new SPA()

// 增加中间件
app.add(rest)
app.add(history)
app.add(rewrite)
app.add(authFilter)
app.add(router)

const options = {
  // dom根容器
  root: document.getElementById('app'),
  // 重定向规则
  rules: [
    {
      matcher: /\/group\/[\d]+\/user\/[\d]/i,
      target: function (context) {
        let ret = /^\/group\/([^/]+?)\/user\/([^/]+?)$/gi.exec(context.hash.pathname)
        return '/user/' + ret[2]
      }
    },
    {
      matcher: '/',
      target: '/user/1'
    }
  ],
  // 路由
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/404',
      component: Page404
    },
    {
      path: '/user/:uid',
      // component: User,
      getComponent: () => import('./page/User')
    },
    {
      path: '/group/:gid/users',
      component: GroupUsers
    }
  ]
}

app.start(options)
window.app = app
