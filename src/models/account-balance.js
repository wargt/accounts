import iModel from './i-model'

// Остаток по счету
export default class AccountBalance extends iModel {
  static model = {
    AcctNum: {
      type: String,
      label: 'Счет'
    },
    Balance: {
      type: Number,
      label: 'Остаток по счету'
    },
    OpDate: {
      type: Date,
      label: 'Дата операции'
    }
  }
}
