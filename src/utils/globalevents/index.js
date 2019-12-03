import Vue from 'vue'

const events = new Vue()

export default {

  install (Vue) {

    Vue.prototype.$globalEvents = events
  }
}

export { events }
