import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Answers from './views/Answers.vue'
import Ambassadors from './views/Ambassadors.vue'
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/answers',
      name: 'previousAnswers',
      component: Answers
    },
    {
      path: '/ambassadors',
      name: 'ambassadors',
      component: Ambassadors
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: Home
    }
  ]
})
