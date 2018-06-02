/**
 * @class Module
 * @description 组件基类
 */
export default class Module {
  constructor (options) {
    this._parent = options.root // 渲染在哪个位置
    this._body = null
  }

  build (options) {
    // 子类生成 this._body
  }

  show () {
    if (this._body) {
      this._parent.appendChild(this._body)
    }
  }

  refresh () {

  }

  hide () {
    /* 也可以引入缓存机制隐藏但不销毁,  */
    if (this._body) {
      this._parent.removeChild(this._body)
    }
  }

  destroy () {
    /* 处理移除dom还要移除监听器 */

  }
}
