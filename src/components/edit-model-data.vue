<template lang="html">
  <div>
    <div
      class="row"
      v-for="(field,index) in fieldRows"
      :key="index"
    >
      <div class="label">
        {{field.label}}
      </div>
      <input-form
        :placeholder="field.label"
        v-model="form[field.propName]"
      />
    </div>

    <div class="row">
      <button-form name="Сохранить" @click="btnClicked" />
    </div>
  </div>
</template>

<script>
  import { forEach } from 'lodash'
  import InputForm from '@/components/form/input-form'
  import ButtonForm from '@/components/form/button-form'

  export default {
    name: 'EditModelData',
    components: {
      'input-form': InputForm,
      'button-form': ButtonForm
    },
    props: {
      model: { // модель объекта (@/models/*)
        type: Function,
        required: true
      },
      itemData: { // данные объекта
        type: Object,
        default: () => ({})
      },
      onSaveClicked: { // функция клика сохранить
        type: Function,
        default: () => (() => {}),
        required: true
      }
    },
    data () {
      return {
        form: this.model.getModel(this.itemData)
      }
    },
    computed: {

      fieldRows () {
        const rows = []

        forEach(this.model.model, (props, propName) => {
          rows.push({
            label: props.label,
            propName
          })
        })

        return rows
      }
    },

    methods: {
      btnClicked () {
        this.onSaveClicked(this.form)
      }
    }
  }
</script>

<style lang="sass" scoped>
  .label
    font-size: 16px
    color: #666
    margin-bottom: 6px

  .row + .row
    margin-top: 30px
</style>
