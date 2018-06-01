
// 模拟一个 80%情况成功, 20%情况失败的调用用户请求的接口
export default function request (url) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      if (Math.random() > 0.2) {
        resolve({
          error_code: 0,
          error_message: '',
          data: {
            uid: '233',
            username: '66ccff'
          }
        })
      } else {
        reject(new Error('登录失效'))
      }
    }, 1000)
  })
}
