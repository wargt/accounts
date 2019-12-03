import CRUDmodule from './base/crud-module'
import { entries } from '@/server-data'

export default class Entries extends CRUDmodule {

  state () {
    return {
      ...super.state(),
      activeEntryId: null // id выбранной проводки
    }
  }

  mutations() {
    return {
      ...super.mutations(),
      changeActiveEntry (state, entryId) {
        state.activeEntryId = entryId
      }
    }
  }

  actions() {
    const actions = super.actions()

    return {
      ...actions,

      fetchItems (args) {
        const { commit } = args

        // сбросим выбранную проводку когда запрашиваем список
        commit('changeActiveEntry', null)

        return actions.fetchItems(args, entries)
      },

      // Проводки по счету, на конкретную дату
      filterItems (args, { OpDate, AcctNum }) {
        let items = entries.slice()

        if (OpDate) {
          items = items.filter(item => item.OpDate === OpDate)
        }

        if (AcctNum) {
          items = items.filter(item => item.AcctNumCr === AcctNum)
        }

        return actions.fetchItems.call(this, args, items)
      }
    }
  }

  getters () {
    return {
      activeEntry (state) {
        if (!state.activeEntryId) {
          return null
        }

        return state.items.find(item => item.id === state.activeEntryId)
      }
    }
  }
}
