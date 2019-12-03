import iModel from './i-model'

// Операционные даты
export default class OperationDate extends iModel {
  static model = {
    OpDate: {
      type: Date,
      label: 'Дата'
    }
  }
}
