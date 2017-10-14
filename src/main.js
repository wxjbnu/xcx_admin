// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store'
import vueResource from 'vue-resource'
Vue.use(vueResource);

Vue.config.productionTip = false


Vue.filter('dateFormat', function (value) {
  // console.log(value)
    if(value){
      let year = value.getFullYear()
      let month = (value.getMonth() + 1 > 9) ? (value.getMonth() + 1) : '0' + (value.getMonth() + 1)
      let day = (value.getDate() > 9) ? value.getDate() : '0' + value.getDate()
    
      let hour = (value.getHours() > 9) ? value.getHours() : '0' + value.getHours()
      let minite = (value.getMinutes() > 9) ? value.getMinutes() : '0' + value.getMinutes()
      let second = (value.getSeconds() > 9) ? value.getSeconds() : '0' + value.getSeconds()
  
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minite + ':' + second;
    }
    return '';
  })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
