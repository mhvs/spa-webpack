import Module from '../common/Module'
/**
 * @class Login
 * @description 登录页面
 */
export default class Login extends Module {
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

  // 注册监听器, 点击登录跳转到用户页, 可能有监听事件多次注册的问题
  handleClick (context) {
    document.getElementById('h-login-button').addEventListener('click', function () {
      const user = {
        uid: document.getElementById('h-username').value,
        username: document.getElementById('h-username').value
      }
      context.setSession({...context.session, user})
      context.redirect('/user/' + user.uid)
    })
  }

  _doUpdateUser (context) {
    this._unode.innerHTML = '<p><input id="h-username" value="1"></p>' + '<p><button id="h-login-button">登录</button></p>'
    this.handleClick(context)
  }
}
