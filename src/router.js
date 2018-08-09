import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AskQuestion from './components/Home/AskQuestion.vue'
import ActionButtons from './components/Home/ActionButtons.vue'
import Answers from './views/Answers.vue'
import Volunteers from './views/Volunteers.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          name: 'welcome',
          component: ActionButtons
        },
        {
          path: '/ask',
          name: 'askQuestion',
          component: AskQuestion
        }
      ]
    },
    {
      path: '/answers',
      name: 'previousAnswers',
      component: Answers
    },
    {
      path: '/volunteers',
      name: 'volunteers',
      component: Volunteers
    }
  ]
})
