import authFilter from '@/middleware/authFilter'

describe('middleware', function () {
  describe('authFilter', function () {
    it('should pass through when there is a session', function (done) {
      let passToNext = false
      const context = {
        session: {user: {uid: '233', username: '66ccff'}},
        hash: {},
        setSession: f => f
      }
      const next = () => {
        passToNext = true
      }
      authFilter()(context, next)
      expect(passToNext).to.equal(true)
      done()
    })
    it('should pass through when pathname is login or 404', function (done) {
      let passToNext = false
      const context = {
        session: {user: {uid: '233', username: '66ccff'}},
        hash: {pathname: '/login'},
        setSession: f => f
      }
      const next = () => {
        passToNext = true
      }
      authFilter()(context, next)
      expect(passToNext).to.equal(true)
      // 重置passToNext并开始测试404页面的情况
      passToNext = false
      context.hash.pathname = '/404'
      authFilter()(context, next)
      expect(passToNext).to.equal(true)
      done()
    })
    it('should request to check auth when there is no user', function (done) {
      let requested = false
      const context = {
        hash: {pathname: '/not404orlogin'},
        setSession: f => (requested = true),
        redirect: f => (requested = true)
      }
      const next = f => f
      authFilter()(context, next).then(res => {
        expect(requested).to.equal(true)
        done()
      })
    })
  })
})
