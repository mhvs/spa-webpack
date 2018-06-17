import router from '@/middleware/router'
import rest from '@/middleware/rest'
import GroupUsers from '@/page/GroupUsers'
import Login from '@/page/Login'
import Page404 from '@/page/404'

describe('middleware', function () {
  describe('router', function () {
    const options = {
      root: document.createElement('div'),
      routes: [
        {
          path: '/login',
          component: Login
        },
        {
          path: '/404',
          component: Page404
        },
        {
          path: '/user/:uid',
          // component: User,
          getComponent: () => import('@/page/User')
        },
        {
          path: '/group/:gid/users',
          component: GroupUsers
        },
        {
          path: '/htmltest',
          getComponent: () => fetch('@/static/htmltest.html')
        },
        {
          path: '/urlnocomponent'
        }
      ]
    }
    it('can use component', function (done) {
      let passToNext = false
      const context = {
        request: {
          origin: 'http://localhost:8081',
          pathname: '/',
          hash: '#/login'
        }
      }
      const next = () => {
        passToNext = true
      }
      rest(options)(context, f => f)
      router(options)(context, next)
      expect(passToNext).to.equal(true)
      done()
    })
    it('can use async component', function (done) {
      let passToNext = false
      const context = {
        request: {
          origin: 'http://localhost:8081',
          pathname: '/',
          hash: '#/user/1'
        }
      }
      const next = () => {
        passToNext = true
        expect(passToNext).to.equal(true)
        done()
      }
      rest(options)(context, f => f)
      router(options)(context, next)
    })
    it('can use html component', function (done) {
      let passToNext = false
      const context = {
        request: {
          origin: 'http://localhost:8081',
          pathname: '/',
          hash: '#/htmltest'
        }
      }
      const next = () => {
        passToNext = true
        expect(passToNext).to.equal(true)
        done()
      }
      rest(options)(context, f => f)
      router(options)(context, next)
    })
    it('should redirect to 404 if there is no route', function (done) {
      let passToNext = false
      let redirectedUrl = ''
      const context = {
        request: {
          origin: 'http://localhost:8081',
          pathname: '/',
          hash: '#/urlnotexist'
        },
        redirect: url => (redirectedUrl = url)
      }
      const next = f => f
      rest(options)(context, f => f)
      router(options)(context, next)
      expect(passToNext).to.equal(false)
      expect(redirectedUrl).to.equal('/404')
      done()
    })
    it('should redirect to 404 if there is no component', function (done) {
      let passToNext = false
      let redirectedUrl = ''
      const context = {
        request: {
          origin: 'http://localhost:8081',
          pathname: '/',
          hash: '#/urlnocomponent'
        },
        redirect: url => (redirectedUrl = url)
      }
      const next = f => f
      rest(options)(context, f => f)
      router(options)(context, next)
      expect(passToNext).to.equal(false)
      expect(redirectedUrl).to.equal('/404')
      done()
    })
    it('should pass through if there is no change', function (done) {
      let passToNext = false
      const context = {
        request: {
          origin: 'http://localhost:8081',
          pathname: '/',
          hash: '#/login'
        }
      }
      const next = () => {
        passToNext = true
        expect(passToNext).to.equal(true)
        done()
      }
      rest(options)(context, f => f)
      router(options)(context, f => f)
      rest(options)(context, f => f)
      router(options)(context, next)
    })
  })
})
