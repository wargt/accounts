import CRUDmodule from './base/crud-module'
import { accounts } from '@/server-data'

export default class Accounts extends CRUDmodule {

  state () {
    return {
      ...super.state(),
      activeAccount: null, // выбранный аккаунт
    }
  }

  mutations () {
    return {
      ...super.mutations(),
      changeActiveAccount (state, account) {
        return state.activeAccount = account
      }
    }
  }

  actions() {
    const actions = super.actions()

    return {
      ...actions,
      fetchItems (args) {
        const { commit } = args

        // сбросим выбранный счет когда запрашиваем список
        commit('changeActiveAccount', null)

        return actions.fetchItems(args, accounts)
      }
    }
  }
}
