import Vue from 'vue'
import Router from 'vue-router'
import Game from '@/components/GameWindow'
import Contents from '@/components/ContentsPage'

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
      path: '/language/:lang',
      name: 'game',
      component: Game
    },
    {
      path: '/contents/:post',
      name: 'contents',
      component: Contents
    }
  ]
})
