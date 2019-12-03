import Vue from 'vue'
import GlobalEvents from './utils/globalevents'
import router from './router'
import store from './store'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(GlobalEvents)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
