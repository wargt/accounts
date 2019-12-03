export default class iModel {
  static model = {} // модель данных

  // отдаем готовую модель c данными
  static getModel (modelValues = {}) {
    const props = Object.keys(this.model)
    const initialModel = {}

    props.forEach(propName => {
      initialModel[propName] = null
    })

    return { ...initialModel, ...modelValues}
  }
}
