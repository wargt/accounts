import CRUDmodule from './base/crud-module'
import { entries } from '@/server-data'

export default class Entries extends CRUDmodule {

  actions() {
    const actions = super.actions()

    return {
      ...actions,

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
}
