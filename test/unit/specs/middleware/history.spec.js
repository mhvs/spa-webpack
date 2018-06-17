import history from '@/middleware/history'

describe('middleware', function () {
  describe('history', function () {
    it('should record hash and pass through', function (done) {
      let passToNext = false
      const context = {
        request: {hash: '/login'}
      }
      const next = () => {
        passToNext = true
      }
      history()(context, next)
      expect(passToNext).to.equal(true)
      done()
    })
  })
})
