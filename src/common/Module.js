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
    if (this._body) {
      this._parent.removeChild(this._body)
    }
  }

  destroy () {

  }
}
