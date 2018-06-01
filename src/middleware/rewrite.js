// 重定向中间件

export default function rewrite (options) {
  let rules = options.rules || []
  rules.forEach(function (it) {
    // 将target统一包装为函数
    let target = it.target
    if (typeof target !== 'function') {
      it.target = function (context) {
        return target
      }
    }

    // 将matcher统一包装为函数
    let matcher = it.matcher

    if (typeof matcher === 'function') {
      return
    }

    if (typeof matcher === 'string') {
      it.matcher = function (ctx) {
        return ctx.hash.pathname === matcher
      }
      return
    }

    if (matcher instanceof RegExp) {
      it.matcher = function (ctx) {
        return matcher.test(ctx.hash.pathname)
      }
    }
  })
  return function (context, next) {
    // 如果没有hash路由, 那么跳到hash根路由
    if (!context.hash || !context.hash.pathname) {
      context.redirect('/')
      return
    }

    // 路由重定向匹配结果
    let ret = rules.find(function (it) {
      return it.matcher(context)
    })

    if (ret) {
      // 定位成功跳转到新路由, 并且不执行next
      let target = ret.target(context)
      context.redirect(target)
      return
    }
    next()
  }
}
