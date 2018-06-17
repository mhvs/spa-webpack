// rest参数解析中间件

export default function rest (options) {
  let routes = options.routes || []
  let matchers = []

  routes.forEach(function (it, index, list) {
    let temp = str2matcher(it.path)
    matchers[index] = temp
    list[index].matcher = temp.matcher
  })

  // string转成匹配函数
  function str2matcher (url) {
    let ret = {
      url: url,
      keys: []
    }

    let reg = url.replace(/:(.+?)(?=\/|$)/g, function ($1, $2) {
      ret.keys.push($2)
      return '([^/]+?)'
    })
    ret.matcher = new RegExp('^' + reg + '$', 'gi')
    return ret
  }

  // 获得匹配到的参数
  function getParams (path) {
    let ret = {}
    matchers.find(function (it) {
      let res = it.matcher.exec(path)
      if (res) {
        it.keys.forEach(function (key, index) {
          ret[key] = res[index + 1] || ''
        })
      }
    })
    return ret
  }

  return function (context, next) {
    let req = context.request

    // 获得得到的rest参数并存到 context的 req 或者 hash上
    req.restParams = getParams(
      req.pathname
    )
    if (req.hash) {
      let hash = new window.URL(
        req.hash.substr(1),
        req.origin
      )
      context.hash = hash
      hash.restParams = getParams(
        hash.pathname
      )
    }

    next()
  }
}
