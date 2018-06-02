// 路由中间件
export default function router (options) {
  let routes = options.routes || {}
  let current = null

  return function (context, next) {
    /* 找到当前url匹配的路由 */
    let path = context.hash.pathname
    let route = routes.find(r => {
      r.matcher.test(path)
      return r.matcher.test(path)
    })

    /* 找不到匹配的路由就跳到404 */
    if (!route) {
      context.redirect('/404')
      return
    }
    const process = (Component) => {
      if (current instanceof Component) {
        /* 如果当前模块就是路由的模块, 那么刷新当前模块 */
        current.refresh(context)
      } else {
        /* 如果当前模块不是是路由的模块, 那么使用新模块 */
        if (isHTMLModule(current)) {
          /* 用于HTML模块销毁自己 */
          document.getElementById('app').innerHTML = ''
        } else {
          if (current) {
            current.hide()
          }
        }
        const module = new Component(options)
        module.build(context)
        current = module
        current.show(context)
        next()
      }
    }
    if (route.component) {
      process(route.component)
    } else if (route.getComponent) {
      route.getComponent().then(parseResponse).then(res => {
        /* 这里假设了只有html和component两种情况, 实际项目中不可能处理的如此
         * vue会变编译为js模块
         * html模板也有专门的loader处理
         * 这里仅为示意
         * */
        if (typeof res === 'string') {
          if (current) {
            current.hide()
            current = res
          }
          document.getElementById('app').innerHTML = res
          next()
        } else {
          process(res.default)
        }
      }).catch(e => {
        console.log(e)
      })
    } else {
      context.redirect('/404')
    }
  }
}

function parseResponse (res) {
  if (res.__esModule) {
    return res
  } else {
    return res.text()
  }
}

function isHTMLModule (current) {
  return typeof current === 'string'
}
