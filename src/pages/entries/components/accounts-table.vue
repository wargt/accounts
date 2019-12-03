<template lang="html">
  <div class="accounts__table">

    <title-and-link
      title="Счета дебета и кредита"
      link="+ Добавить счет"
      @linkClicked="onLinkClicked"
    />

    <v-table
      :columns="accountColumns"
      :rows="accountRows"
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

      // активная проводка
      ...mapGetters('entries', ['activeEntry']),

      // счета
      accountRows (state) {
        return state.accounts.items
      },

      // проводки по счету
      accountBalanceItems (state) {
        return state.accountBalance.items
      },
    }),
    methods: {

      // запросим список счетов
      async fetchAccounts () {
        this.$store.commit('changeLoader', true)

        const { AcctNumCr, AcctNumDB, OpDate } = this.activeEntry

        await this.$store.dispatch('accounts/filterItems', { AcctNumCr, AcctNumDB })

        // запрос баланса
        await this.$store.dispatch('accountBalance/filterItems', OpDate)

        this.$store.commit('changeLoader', false)
      },

      // получим баланс по счету
      balanceColumn (row) {
        const accountBalance = this.accountBalanceItems.find(item => item.AcctNum === row.AcctNum)

        return accountBalance ? `${accountBalance.Balance} ₽` : ''
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
    },
    watch: {
      activeEntry () {
        this.fetchAccounts()
      }
    }
  }
</script>

<style lang="sass" scoped>
</style>
