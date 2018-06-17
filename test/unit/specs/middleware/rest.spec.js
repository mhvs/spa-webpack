import rest from '@/middleware/rest'

describe('middleware', function () {
  describe('rest', function () {
    it('should parse url', function (done) {
      let passToNext = false
      const options = {
        routes: [{
          path: '/user/:uid'
        }]
      }
      const context = {
        request: {
          origin: 'http://localhost:8081',
          pathname: '/',
          hash: '#/user/123'
        }
      }
      const next = () => {
        passToNext = true
      }
      rest(options)(context, next)
      expect(passToNext).to.equal(true)
      expect(context.hash.restParams.uid).to.equal('123')
      done()
    })
  })
})
