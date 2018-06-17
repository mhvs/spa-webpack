import Monitor from '@/middleware/Monitor'

describe('middleware', function () {
  describe('Monitor', function () {
    it('should be ok to start monitor', function (done) {
      let monitor = new Monitor()
      expect(monitor.timer).to.be.a('number')
      done()
    })
    it('should check url change', function (done) {
      let monitor = new Monitor({
        onChange: (event) => {
          expect(event.newValue).to.be.a('string')
          done()
        }
      })
      monitor.runURLCheck('/login')
    })
  })
})
