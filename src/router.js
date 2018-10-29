import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Answers from './views/Answers.vue'
import Ambassadors from './views/Ambassadors.vue'
import About from './views/About.vue'
import Privacy from './views/Privacy.vue'
import AnswerDetails from './views/AnswerDetails.vue'
import Error404 from './views/Error404.vue'

Vue.use(Router)

export default new Router({
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return { selector: to.hash }
    } else if (savedPosition) {
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
      path: '/ask',
      name: 'ask',
      component: Home
    },
    {
      path: '/answers',
      name: 'previousAnswers',
      component: Answers
    },
    {
      path: '/answers/:id',
      name: 'AnswerDetails',
      component: AnswerDetails
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
      component: Privacy
    },
    {
      path: '/404',
      name: 'Error404',
      component: Error404
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
