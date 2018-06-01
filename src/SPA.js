import Monitor from './middleware/Monitor'
export default class SPA {
  constructor (options) {
    this.mws = [] // 中间件
    this.monitor = null // 监听器
    this.session = null // 记住是否登录
  }

  add (mw) {
    if (typeof mw === 'function') {
      this.mws.push(mw)
    }
  }

  dispatch (context) {
    console.log('context', context)
    // 处理一次event
    let index = 0
    let next = () => {
      let mw = this.mws[index]
      index++
      if (mw) {
        return mw(context, next)
      }
    }
    next()
  }

  start (options) {
    // 初始化所有中间件
    this.mws = this.mws.map(mw => mw(options))
    const spa = this
    // 启动url监听器
    this.monitor = new Monitor({
      onChange (event) {
        spa.dispatch({
          request: new URL(event.newValue),
          session: spa.session,
          redirect,
          setSession: newSession => (spa.session = newSession)
        })
      }
    })
    // 重定向函数, 用来改变路由
    function redirect (hash) {
      window.location.hash = '#' + hash
    }
  }

  destroy () {
    this.monitor.stop()
  }
}
