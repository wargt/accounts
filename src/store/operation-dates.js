import CRUDmodule from './base/crud-module'
import { operationDates } from '@/server-data'

export default class OperationDates extends CRUDmodule {

  state () {
    return {
      ...super.state(),
      activeDateId: null // id выбранной даты
    }
  }

  mutations() {
    return {
      ...super.mutations(),
      changeActiveDate (state, operationDateId) {
        state.activeDateId = operationDateId
      }
    }
  }

  actions() {
    const actions = super.actions()

    return {
      ...actions,
      fetchItems (args) {
        const { commit } = args

        // сбросим активную дату при запросе
        commit('changeActiveDate', null)

        return actions.fetchItems(args, operationDates)
      }
    }
  }

  getters () {
    return {
      activeDate (state) {
        if (!state.activeDateId) {
          return null
        }

        return state.items.find(item => item.id === state.activeDateId)
      }
    }
  }
}
