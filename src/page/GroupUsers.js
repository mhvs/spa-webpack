import Module from '../common/Module'
/**
 * @class GroupUsers
 * @description 用户列表页面
 */
export default class GroupUsers extends Module {
  constructor (options) {
    super(options)
    this._unode = null
  }

  build (context) {
    super.build(context)
    this._body = document.createElement('div')
    this._unode = document.createElement('div')
    this._body.appendChild(this._unode)
  }

  show (context) {
    super.show(context)
    this._doUpdateUser(context)
  }

  refresh (context) {
    super.refresh(context)
    this._doUpdateUser(context)
  }

  _doUpdateUser (context) {
    let gid = (context.hash && context.hash.restParams && context.hash.restParams.gid) || ''
    // 生成用户列表
    this._unode.innerHTML = Array(10).fill(1).map((_, index) => '<a href="#/user/' + gid + index + '" ><p> 用户 ' + gid + index + ' </p></a>').join('')
  }
}
