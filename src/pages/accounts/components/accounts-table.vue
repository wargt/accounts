<template lang="html">
  <div class="accounts__table">

    <title-and-link
      title="Мои счета"
      link="+ Добавить счет"
      @linkClicked="onLinkClicked"
    />

    <v-table
      :columns="accountColumns"
      :rows="accountRows"
      :activeRowIndex="activeRowIndex"
      @rowClicked="onAccountRowClicked"
      @iconClicked="onIconClicked"
    />
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import vTable from '@/components/v-table'
  import TitleAndLink from '@/components/title-and-link'
  import ViewModelData from '@/components/view-model-data'
  import EditModelData from '@/components/edit-model-data'
  import AccountModel from '@/models/account'

  export default {
    name: 'AccountsTable',
    components: {
      'v-table': vTable,
      'title-and-link': TitleAndLink
    },
    data () {
      return {
        activeRow: null, // выделенная строка
        accountColumns: [
          {
            label: 'Счет',
            field: row => row.AcctNum,
            width: '70%'
          },
          {
            label: 'Баланс',
            field: this.balanceColumn,
            align: 'right',
            width: '20%'
          },
          {
            icons: [
              { type: 'view', clickable: true },
              { type: 'edit', clickable: true },
              { type: 'delete', clickable: true }
            ],
            width: '10%'
          }
        ]
      }
    },
    mounted () {
      this.fetchAccounts()
    },
    computed: mapState({

      // дата опердня
      ...mapGetters('operationDates', ['activeDate']),

      // счета
      accountRows (state) {
        return state.accounts.items
      },

      // проводки по счету
      accountBalanceItems (state) {
        return state.accountBalance.items
      },

      // индекс выделенной строки в таблице
      activeRowIndex () {
        if (!this.activeRow) {
          return null
        }

        return this.accountRows.findIndex(item => item.id === this.activeRow.id)
      },
    }),
    methods: {

      // запросим список счетов
      async fetchAccounts () {
        this.$store.commit('changeLoader', true)

        await this.$store.dispatch('accounts/fetchItems')

        this.$store.commit('changeLoader', false)
      },

      // получим баланс по счету
      balanceColumn (row) {
        const accountBalance = this.accountBalanceItems.find(item => item.AcctNum === row.AcctNum)

        return accountBalance ? `${accountBalance.Balance} ₽` : ''
      },

      // кликнули на строку таблицы
      onAccountRowClicked ({ row }) {

        if (this.activeRow && this.activeRow.id === row.id) {

          this.activeRow = null

        } else {

          this.activeRow = row
        }

        this.$store.commit('accounts/changeActiveAccount', this.activeRow)

        this.fetchEntries()
      },

      // запрашиваем проводки по счету
      async fetchEntries () {

        if (!this.activeRow) {
          return
        }

        this.$store.commit('changeLoader', true)

        await this.$store.dispatch('entries/filterItems', {
          AcctNum: this.activeRow.AcctNum
        })

        this.$store.commit('changeLoader', false)
      },

      // клик по иконке
      onIconClicked ({ icon, row }) {
        const { type } = icon

        // просмотрим данные счета
        if (type === 'view') {

          this.$globalEvents.$emit('openPopup', {
            title: 'Просмотр счета',
            component: ViewModelData,
            data: {
              model: AccountModel,
              itemData: row
            }
          })
        }

        // отредактируем данные счета
        if (type === 'edit') {

          this.$globalEvents.$emit('openPopup', {
            title: 'Редактирование счета',
            component: EditModelData,
            data: {
              model: AccountModel,
              itemData: row,
              onSaveClicked: this.updateAccount
            }
          })
        }

        if (type === 'delete') {

          this.$globalEvents.$emit('openConfirmDialog', {
            title: 'Удалить счет?',
            desc: 'Внимание, выбранный счет будет удален без возможности восстановления.',
            onConfirm: this.removeAccount.bind(this, row)
          })
        }
      },

      // окно создание счета
      onLinkClicked () {

        this.$globalEvents.$emit('openPopup', {
          title: 'Создание счета',
          component: EditModelData,
          data: {
            model: AccountModel,
            onSaveClicked: this.updateAccount
          }
        })
      },

      // запрос на создание или обновление счета
      async updateAccount (accountData) {
        this.$store.commit('changeLoader', true)

        if (accountData.id) {
          await this.$store.dispatch('accounts/updateItem', accountData)
        } else {
          await this.$store.dispatch('accounts/createItem', accountData)
        }

        this.$store.commit('changeLoader', false)

        this.$globalEvents.$emit('closePopup')
      },

      // запрос на удаление счета
      async removeAccount ({ id }) {
        this.$store.commit('changeLoader', true)

        await this.$store.dispatch('accounts/removeItem', id)

        this.$store.commit('changeLoader', false)
      }
    }
  }
</script>

<style lang="sass" scoped>
</style>
