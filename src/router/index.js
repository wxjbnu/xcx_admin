import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import main from '@/views/main'
import demo from '@/views/demo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'app',
      component: main,
      children:[
        {
          path: '/demo',
          name: 'demo',
          component: demo,
        }
      ]
    }
  ]
})
