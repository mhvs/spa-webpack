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
        const module = new Component(options)
        module.build(context)
        if (current) {
          current.hide()
        }
        current = module
        current.show(context)
        next()
      }
    }
    if (route.component) {
      process(route.component)
    } else if (route.getComponent) {
      route.getComponent().then(res => {
        process(res.default)
      })
    } else {
      context.redirect('/404')
    }
  }
}
