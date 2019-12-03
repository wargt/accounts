<template lang="html">
  <div>
    <div
      class="row flex"
      v-for="(item,index) in itemRows"
      :key="index"
    >
      <div class="flex-item">
        {{item.label}}
      </div>
      <div class="flex-item">
        {{item.value}}
      </div>
    </div>
  </div>
</template>

<script>
  import { forEach } from 'lodash'

  export default {
    name: 'ViewModelData',
    props: {
      model: { // модель объекта (@/models/*)
        type: Function,
        required: true
      },
      itemData: { // данные объекта
        type: Object,
        required: true
      }
    },
    computed: {
      itemRows () {
        const rows = []

        forEach(this.model.model, (props, propName) => {
          rows.push({
            label: props.label,
            value: this.itemData[propName]
          })
        })

        return rows
      }
    }
  }
</script>

<style lang="sass" scoped>
  .row
    padding: 14px

  .row:nth-child(2n + 1)
    background-color: #fde8d6
</style>
