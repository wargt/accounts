import Vue from 'vue'
import Vuex from 'vuex'
import MutationListenerPlugin from './base/mutation-listener'

import OperationDates from './operation-dates'
import Accounts from './accounts'
import AccountBalance from './account-balance'
import Entries from './entries'

Vue.use(Vuex)

const store = new Vuex.Store({
  namespaced: true,
  plugins: [MutationListenerPlugin],
  modules: {
    operationDates: new OperationDates().getModule(),
    accounts: new Accounts().getModule(),
    accountBalance: new AccountBalance().getModule(),
    entries: new Entries().getModule()
  },
  state: {
    showLoader: false
  },
  mutations: {
    changeLoader (state, value) {
      state.showLoader = value
    }
  }
})

export default store
