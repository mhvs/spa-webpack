/**
 * @class Monitor
 * @description 路由变化监听器
 */
export default class Monitor {
  constructor (options) {
    this.options = options || {}
    this.last = null
    this.timer = this.start()
  }

  // 检测到路由变化则发送event
  runURLCheck (path) {
    let url = path || window.location.href
    if (url !== this.last) {
      let event = {
        oldValue: this.last,
        newValue: url
      }
      this.last = url

      if (typeof this.options.onChange === 'function') {
        // 可以借助事件机制
        this.options.onChange(event)
      }
    }
  }

  // 启动定时器, 每隔500毫秒监听一次路由变化
  start () {
    return window.setInterval(this.runURLCheck.bind(this), 500)
  }

  stop () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
