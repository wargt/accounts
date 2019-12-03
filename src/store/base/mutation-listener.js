import { entries, accountBalance, accounts, operationDates } from '@/server-data'

const crudModules = {
  'operationDates': operationDates,
  'accounts': accounts,
  'accountBalance': accountBalance,
  'entries': entries
}

// плагин нужен для того что бы обновлять данные на эмулируемом сервере (@/server-data)
export default store => {

  const addItem = (module, item) => {
    crudModules[module].push(item)
  }

  const updateItem = (module, item) => {
    const serverItems = crudModules[module]

    const index = serverItems.findIndex(oldItem => oldItem.id === item.id)

    if (typeof index !== 'undefined') {
      serverItems[index] = { ...serverItems[index], ...item }
    }
  }

  const removeItem = (module, id) => {
    const serverItems = crudModules[module]

    const index = serverItems.findIndex(oldItem => oldItem.id === id)

    if (typeof index !== 'undefined') {
      serverItems.splice(index, 1)
    }
  }

  store.subscribe(mutationData => {

    const [module, mutation] = mutationData.type.split('/')
    const { payload } = mutationData

    if (!crudModules[module]) {
      return
    }

    switch (mutation) {
      case 'addItem':
        addItem(module, payload)
        break
      case 'updateItem':
        updateItem(module, payload)
        break
      case 'removeItem':
        removeItem(module, payload)
        break
    }
  })
}

