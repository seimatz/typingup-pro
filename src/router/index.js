import Vue from 'vue'
import Router from 'vue-router'
import Game from '@/components/GameWindow'
import Contents from '@/components/ContentsPage'
import NotFound from '@/components/NotFoundPage'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'top',
      component: Game
    },
    {
      path: '/language/:lang(english|french|german|italian|portuguese|russian|spanish|bash|git)',
      name: 'game',
      component: Game
    },
    {
      path: '/contents/:post(feedback|howtouse)',
      name: 'contents',
      component: Contents
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFound
    }
  ]
})
