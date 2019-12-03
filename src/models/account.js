import iModel from './i-model'

// Счета
export default class Account extends iModel {
  static model = {
    AcctNum: {
      type: String,
      label: 'Счет'
    }
  }
}
