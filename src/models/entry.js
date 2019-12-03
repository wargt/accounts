import iModel from './i-model'

// Проводки
export default class Entry extends iModel {
  static model = {
    AcctNumCr: {
      type: String,
      label: 'Счет кредита'
    },
    AcctNumDB: {
      type: String,
      label: 'Счет дебета'
    },
    Amount: {
      type: Number,
      label: 'Сумма'
    },
    OpDate: {
      type: Date,
      label: 'Дата операции'
    }
  }
}
