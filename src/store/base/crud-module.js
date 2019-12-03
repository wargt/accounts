// Базовый модуль CRUD
const timeout = 500

export default class CRUDModule {

  state () {
    return {
      items: []
    }
  }

  mutations () {
    return {
      setItems (state, items) {
        state.items = []
        state.items = items.slice()
      },

      addItem (state, item) {
        const id = parseInt(Math.abs(Math.random() * 100), 10)
        state.items.push({ ...item, id })
      },

      updateItem (state, item) {
        const index = state.items.findIndex(oldItem => oldItem.id === item.id)

        if (typeof index !== 'undefined') {
          state.items[index] = { ...state.items[index], ...item }
          state.items = state.items.slice()
        }
      },

      removeItem (state, id) {
        const index = state.items.findIndex(item => item.id === id)

        if (typeof index !== 'undefined') {
          state.items.splice(index, 1)
        }
      }
    }
  }

  actions () {
    return {

      fetchItems ({ commit }, items) {
        commit('setItems', [])

        return new Promise(resolve => {
          setTimeout(() => {
            commit('setItems', items)
            resolve(items)
          }, timeout)
        })
      },

      createItem ({ commit }, item) {
        item.id = parseInt(Math.abs(Math.random() * 1000), 10)

        return new Promise(resolve => {
          setTimeout(() => {
            commit('addItem', item)
            resolve(item)
          }, timeout)
        })
      },

      updateItem ({ commit }, item) {
        return new Promise(resolve => {
          setTimeout(() => {
            commit('updateItem', item)
            resolve(item)
          }, timeout)
        })
      },

      removeItem ({ commit }, id) {
        return new Promise(resolve => {
          setTimeout(() => {
            commit('removeItem', id)
            resolve(true)
          }, timeout)
        })
      }
    }
  }

  getters () {
    return {}
  }

  getModule = () => {
    return {
      namespaced: true,
      state: this.state(),
      actions: this.actions(),
      mutations: this.mutations(),
      getters: this.getters()
    }
  }
}
