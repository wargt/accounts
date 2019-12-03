<template lang="html">
  <div>
    <title-and-link
      title="Проводки по операционным дням"
      link="+ Добавить операцию"
      @linkClicked="onAddClicked"
    />

    <v-table
      :columns="entryColumns"
      :rows="entryRows"
      @iconClicked="onIconClicked"
    />
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import { forEach } from 'lodash'
  import vTable from '@/components/v-table'
  import EntryModel from '@/models/entry'
  import ViewModelData from '@/components/view-model-data'
  import EditModelData from '@/components/edit-model-data'
  import TitleAndLink from '@/components/title-and-link'

  export default {
    name: 'EntriesTable',
    components: {
      'title-and-link': TitleAndLink,
      'v-table': vTable,
    },
    computed: mapState({

      // дата опердня
      ...mapGetters('operationDates', ['activeDate']),

      // колонки таблицы
      entryColumns () {

        const columns = []

        forEach(EntryModel.model, (props, propName) => {

          columns.push({
            label: props.label,
            field: row => propName === 'Amount' ? `${row[propName]} ₽` : row[propName],
            align: propName === 'Amount' ? 'right' : 'left'
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
      entryRows (state) {
        return state.entries.items
      }
    }),
    methods: {
      // клик по иконке
      onIconClicked ({ icon, row }) {
        const { type } = icon

        // просмотрим данные счета
        if (type === 'view') {

          this.$globalEvents.$emit('openPopup', {
            title: 'Просмотр проводки',
            component: ViewModelData,
            data: {
              model: EntryModel,
              itemData: row
            }
          })
        }

        // отредактируем данные счета
        if (type === 'edit') {

          this.$globalEvents.$emit('openPopup', {
            title: 'Редактирование проводки',
            component: EditModelData,
            data: {
              model: EntryModel,
              itemData: row,
              onSaveClicked: this.updateAccount
            }
          })
        }

        if (type === 'delete') {

          this.$globalEvents.$emit('openConfirmDialog', {
            title: 'Удалить проводку?',
            desc: 'Внимание, выбранная проводка будет удалена без возможности восстановления.',
            onConfirm: this.removeAccount.bind(this, row)
          })
        }
      },

      // запрос на создание или обновление
      async updateAccount (entryData) {
        this.$store.commit('changeLoader', true)

        if (entryData.id) {
          await this.$store.dispatch('entries/updateItem', entryData)
        } else {
          await this.$store.dispatch('entries/createItem', entryData)
        }

        this.$store.commit('changeLoader', false)

        this.$globalEvents.$emit('closePopup')
      },

      // запрос на удаление
      async removeAccount ({ id }) {
        this.$store.commit('changeLoader', true)

        await this.$store.dispatch('entries/removeItem', id)

        this.$store.commit('changeLoader', false)
      },

      onAddClicked () {
        const { OpDate } = this.activeDate || {}

        this.$globalEvents.$emit('openPopup', {
          title: 'Создание проводки',
          component: EditModelData,
          data: {
            model: EntryModel,
            onSaveClicked: this.updateAccount,
            itemData: {
              OpDate
            }
          }
        })
      }
    }
  }
</script>

<style lang="sass" scoped>
  .table__title
    margin-bottom: 20px
    font-weight: 500
</style>
