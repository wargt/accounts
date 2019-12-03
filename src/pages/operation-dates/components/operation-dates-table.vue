<template lang="html">
  <div>
    <title-and-link
      title="Мои операционные дни"
      link="+ Добавить день"
      @linkClicked="onAddClicked"
    />

    <v-table
      :columns="tableColumns"
      :rows="tableRows"
      :activeRowIndex="activeRowIndex"
      @iconClicked="onIconClicked"
      @rowClicked="onRowClicked"
    />
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import { forEach } from 'lodash'
  import vTable from '@/components/v-table'
  import TitleAndLink from '@/components/title-and-link'
  import OperationDateModel from '@/models/operation-date'
  import ViewModelData from '@/components/view-model-data'
  import EditModelData from '@/components/edit-model-data'

  export default {
    name: 'OperationDatesTable',
    components: {
      'v-table': vTable,
      'title-and-link': TitleAndLink
    },
    mounted () {
      this.fetchOperationDates()
    },
    computed: mapState({

      // дата опердня
      ...mapGetters('operationDates', ['activeDate']),

      activeRowIndex () {

        if (!this.activeDate) {
          return null
        }

        return this.tableRows.findIndex(item => item.OpDate === this.activeDate.OpDate)
      },

      // колонки таблицы
      tableColumns () {
        const columns = []

        forEach(OperationDateModel.model, (props, propName) => {

          columns.push({
            label: props.label,
            field: row => row[propName]
          })
        })

        columns.push({
          icons: [
            { type: 'view', clickable: true },
            { type: 'edit', clickable: true },
            { type: 'delete', clickable: true }
          ],
          width: '10%'
        })

        return columns
      },

      // строки таблицы
      tableRows (state) {
        return state.operationDates.items
      }
    }),
    methods: {

      // запросим список опер дней
      async fetchOperationDates () {
        this.$store.commit('changeLoader', true)

        await this.$store.dispatch('operationDates/fetchItems')

        this.$store.commit('changeLoader', false)
      },

      onAddClicked () {
        this.$globalEvents.$emit('openPopup', {
          title: 'Создание операционного дня',
          component: EditModelData,
          data: {
            model: OperationDateModel,
            onSaveClicked: this.updateOperationDate
          }
        })
      },

      // клик по иконке
      onIconClicked ({ icon, row }) {
        const { type } = icon

        // просмотрим
        if (type === 'view') {

          this.$globalEvents.$emit('openPopup', {
            title: 'Просмотр опердня',
            component: ViewModelData,
            data: {
              model: OperationDateModel,
              itemData: row
            }
          })
        }

        // отредактируем
        if (type === 'edit') {

          this.$globalEvents.$emit('openPopup', {
            title: 'Редактирование опердня',
            component: EditModelData,
            data: {
              model: OperationDateModel,
              itemData: row,
              onSaveClicked: this.updateOperationDate
            }
          })
        }

        if (type === 'delete') {

          this.$globalEvents.$emit('openConfirmDialog', {
            title: 'Удалить операционный день?',
            desc: 'Внимание, выбранный день будет удален без возможности восстановления.',
            onConfirm: this.removeDate.bind(this, row)
          })
        }
      },

      // запрос на создание или обновление
      async updateOperationDate (operationDateItem) {
        this.$store.commit('changeLoader', true)

        if (operationDateItem.id) {
          await this.$store.dispatch('operationDates/updateItem', operationDateItem)
        } else {
          await this.$store.dispatch('operationDates/createItem', operationDateItem)
        }

        this.$store.commit('changeLoader', false)

        this.$globalEvents.$emit('closePopup')
      },

      // запрос на удаление счета
      async removeDate ({ id }) {
        this.$store.commit('changeLoader', true)

        await this.$store.dispatch('operationDates/removeItem', id)

        this.$store.commit('changeLoader', false)
      },

      // кликнули на строку таблицы
      onRowClicked ({ row }) {

        if (this.activeDate && this.activeDate.id === row.id) {

          this.$store.commit('operationDates/changeActiveDate', null)

        } else {

          this.$store.commit('operationDates/changeActiveDate', row.id)

          this.fetchEntries()
        }
      },

      // запрашиваем проводки по счету
      async fetchEntries () {

        if (!this.activeDate) {
          return
        }

        const { OpDate } = this.activeDate

        this.$store.commit('changeLoader', true)

        await this.$store.dispatch('entries/filterItems', {
          OpDate
        })

        this.$store.commit('changeLoader', false)
      },
    }
  }
</script>

<style lang="sass" scoped>
</style>
