import SPA from '@/SPA'
import Monitor from '@/middleware/Monitor'

describe('SPA', function () {
  it('#start', function (done) {
    let app = new SPA()
    app.start()
    expect(app.monitor instanceof Monitor).to.equal(true)
    done()
  })
  it('#add', function (done) {
    let app = new SPA()
    app.add(function () {})
    expect(app.mws.length).to.equal(1)
    done()
  })
  it('#dispatch', function (done) {
    let dispatched = false
    let app = new SPA()
    app.add(() => { dispatched = true })
    app.dispatch({})
    expect(dispatched).to.equal(true)
    done()
  })
})
