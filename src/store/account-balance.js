import CRUDmodule from './base/crud-module'
import { accountBalance } from '@/server-data'

export default class AccountBalance extends CRUDmodule {

  actions() {
    const actions = super.actions()

    return {
      ...actions,
      // баланс счетов на конкретную дату
      fetchItems (args, opDate) {
        const items = accountBalance.filter(item => item.OpDate === opDate)

        return actions.fetchItems(args, items)
      }
    }
  }
}
