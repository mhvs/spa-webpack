import rewrite from '@/middleware/rewrite'

describe('middleware', function () {
  describe('rewrite', function () {
    const options = {
      rules: [
        {
          matcher: /\/group\/[\d]+\/user\/[\d]/i,
          target: function (context) {
            let ret = /^\/group\/([^/]+?)\/user\/([^/]+?)$/gi.exec(context.hash.pathname)
            return '/user/' + ret[2]
          }
        }
      ]
    }
    it('should redirect to new url if set', function (done) {
      let passToNext = false
      let redirectedUrl = ''
      const context = {
        hash: {
          origin: 'http://localhost:8081',
          pathname: '/group/1/user/123'
        },
        redirect: url => (redirectedUrl = url)
      }
      const next = () => {
        passToNext = true
      }
      rewrite(options)(context, next)
      expect(passToNext).to.equal(false)
      expect(redirectedUrl).to.equal('/user/123')
      done()
    })
    it('should not redirect to new url and pass through if not set', function (done) {
      let passToNext = false
      const context = {
        hash: {
          origin: 'http://localhost:8081',
          pathname: '/group/1'
        },
        redirect: url => url
      }
      const next = () => {
        passToNext = true
      }
      rewrite(options)(context, next)
      expect(passToNext).to.equal(true)
      done()
    })
    it('should redirect to root when there is no hash', function (done) {
      let passToNext = false
      let redirectedUrl = ''
      const context = {
        redirect: url => (redirectedUrl = url)
      }
      const next = () => {
        passToNext = true
      }
      rewrite(options)(context, next)
      expect(passToNext).to.equal(false)
      expect(redirectedUrl).to.equal('/')
      done()
    })
  })
})
