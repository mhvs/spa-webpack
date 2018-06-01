// 历史中间件, 记录历史

export default function history (options) {
  const iframe = document.createElement('iframe')
  iframe.style.position = 'absolute'
  iframe.style.visibility = 'hidden'
  document.body.appendChild(iframe)
  iframe.src = 'about:blank'

  let historyLocker = {}
  window.historyLocker = historyLocker
  /* 处理浏览器前进后退产生的历史,  确保前进后退不会重复推到历史记录里 */
  /* 上次的历史还没走完, 下次的历史就来了, 怎么办 */
  let lockKey = 'lock-' + (+new Date())

  function doPlusHistory (hash) {
    if (!hash || historyLocker[lockKey]) {
      historyLocker[lockKey] = !1
      return
    }

    try {
      const doc = iframe.contentWindow.document
      doc.write('<head><title>')
      doc.write(document.title)
      doc.write('</title>')
      doc.write(
        '<script>' +
        'parent.historyLocker["' + lockKey + '"] = !0;' +
        'parent.location.hash = decodeURIComponent("' + encodeURIComponent(hash) + '");' +
        '</script>'
      )
      doc.write('</head><body></body>')
      doc.close()
      historyLocker[lockKey] = !1
    } catch (ex) {
      // ignore
      console.log(ex)
    }
  }

  return function (context, next) {
    // console.log('context',context)
    doPlusHistory(
      context.request.hash
    )
    next()
  }
}
