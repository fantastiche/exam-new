import Vue from 'vue'
import Router from 'vue-router'
import PageTransition from '@/components/PageTransition/PageTransition'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PageTransition',
      component: PageTransition,
      children: [{
        path: '/',
        redirect: '/judgment'
      }, {
        path: '/judgment',
        name: 'judgment',
        component: resolve => require(['../view/Judgment/judgment.vue'], resolve)
      }, {
        path: '/singleSelect',
        name: 'singleSelect',
        component: resolve => require(['../view/SingleSelect/singleSelect.vue'], resolve)
      }, {
        path: '/multiSelect',
        name: 'multiSelect',
        component: resolve => require(['../view/MultiSelect/multiSelect.vue'], resolve)
      }, {
        path: '/score',
        name: 'score',
        component: resolve => require(['../view/Score/score.vue'], resolve)
      }]
    }
  ]
})
