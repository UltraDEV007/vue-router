import Vue, { ComponentOptions, AsyncComponent, Component } from 'vue'

import VueRouter from '../index'
import {
  Route,
  RouteRecord,
  RedirectOption,
  NavigationFailure,
  NavigationFailureType
} from '../index'

Vue.use(VueRouter)

const Home = { template: '<div>home</div>' }
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
const Abc = { template: '<div>abc</div>' }
const Async = () => Promise.resolve({ template: '<div>async</div>' })

let err: any
if (
  VueRouter.isNavigationFailure(err, VueRouter.NavigationFailureType.aborted)
) {
  err.from.fullPath.split('/')
}

let navigationFailure = new Error() as NavigationFailure
navigationFailure.to.fullPath.split('/')

const Hook: ComponentOptions<Vue> = {
  template: '<div>hook</div>',

  beforeRouteEnter(to, from, next) {
    route.params
    next('/')
    next({ path: '/' })
    next(vm => {
      vm.$router
    })
  },

  beforeRouteLeave(to, from, next) {
    route.params
    next('/')
    next({ path: '/' })
    next()
  },

  beforeRouteUpdate(to, from, next) {
    route.params
    next('/')
    next({ path: '/' })
    next()
  }
}

const JSXComponent = () => {
  $props: {
  }
}

const router = new VueRouter({
  mode: 'history',
  base: '/',
  fallback: false,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  scrollBehavior: (to, from, savedPosition) => {
    if (from.path === '/') {
      return { selector: '#app' }
    }

    if (from.path === '/offset') {
      return { selector: '#foo', offset: { x: 0, y: 100 } }
    }

    if (to.path === '/child') {
      return
    }

    if (savedPosition) {
      return savedPosition
    }

    return Promise.resolve({
      x: 0,
      y: 0
    })
  },
  routes: [
    {
      path: '/foo',
      component: Home,
      children: [{ path: '', component: Home }]
    },
    {
      path: '/foo',
      components: { default: Home },
      children: [{ path: '', component: Home }]
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'child',
          components: {
            default: Foo,
            bar: Bar,
            abc: Abc,
            asyncComponent: Async,
            JSXComponent
          },
          meta: { auth: true, nested: { foo: '' } },
          beforeEnter(to, from, next) {
            to.params
            from.params
            next({ name: 'home' })
            next()
          },
          props: {
            default: true,
            bar: { id: 123 },
            abc: route => route.params,
            asyncComponent: (route: Route) => route.params
          }
        },
        {
          path: 'children',
          redirect: to => {
            to.params
            return '/child'
          }
        }
      ]
    },
    { path: '/home', alias: '/' },
    { path: '/foo', props: true },
    { path: '/bar', props: { id: 123 } },
    { path: '/baz', props: (route: Route) => route.params },
    { path: '*', redirect: '/' }
  ]
})

const App: Vue = router.app
const mode: string = router.mode

const route: Route = router.currentRoute
const path: string = route.path
const name: string | undefined | null = route.name
const hash: string = route.hash
const query: string | (string | null)[] | null = route.query['foo']
const params: string = route.params['bar']
const fullPath: string = route.fullPath
const redirectedFrom: string | undefined = route.redirectedFrom
const meta: any = route.meta
const matched: RouteRecord[] = route.matched

matched.forEach(m => {
  const path: string = m.path
  const components: {
    [key: string]: Component | AsyncComponent | {}
  } = m.components
  const instances: { [key: string]: Vue } = m.instances
  const name: string | undefined | null = m.name
  const parent: RouteRecord | undefined = m.parent
  const redirect: RedirectOption | undefined = m.redirect
})

const unregister = router.beforeEach((to, from, next) => {
  to.params
  next('/')
  next()
})

unregister()

router.beforeResolve((to, from, next) => {
  to.params
  from.params
  next()
})

router.afterEach((to, from) => {
  to.params
  from.params
})

router.push({
  path: '/',
  params: {
    foo: 'foo'
  },
  query: {
    bar: 'bar',
    empty: null,
    removed: undefined,
    withEmpty: ['1', null],
    foo: ['foo1', 'foo2']
  },
  hash: 'hash'
})
router.replace({ name: 'home' })

router.push(
  '/',
  () => {},
  () => {}
)
router.replace(
  '/foo',
  () => {},
  () => {}
)

// promises

router
  .push('/')
  .then(route => {
    route.fullPath
  })
  .catch(() => {})

router.onReady(() => {})

router.addRoutes([{ path: '/more' }])

router.go(-1)
router.back()
router.forward()

const Components: (
  | Component
  | AsyncComponent
  | {}
)[] = router.getMatchedComponents()

const match: Route = router.match('/more')

const vm = new Vue({
  router,
  template: `
    <div id="app">
      <h1>Basic</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/foo">/foo</router-link></li>
        <li><router-link to="/bar">/bar</router-link></li>
      </ul>
      <router-view class="view"></router-view>
    </div>
  `
}).$mount('#app')

vm.$router.push('/')
vm.$route.params
