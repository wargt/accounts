<template lang="html">
  <div class="g-container">

    <text-title class="title" :text="title" />

    <filter-operation-date @filter="onFilteredDate" />

    <div class="flex tables__wrp">
      <div class="flex-item">
        <accounts-table />
      </div>
      <div class="flex-item table__entry">
        <entries-table v-if="activeAccountItem" />
      </div>
    </div>

  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import TextTitle from '@/components/text/text-title'
  import FilterOperationDate from '@/components/filter-operation-date'
  import AccountsTable from './components/accounts-table'
  import EntriesTable from './components/entries-table'

  export default {
    name: 'Accounts',
    components: {
      'text-title': TextTitle,
      'filter-operation-date': FilterOperationDate,
      'accounts-table': AccountsTable,
      'entries-table': EntriesTable
    },
    computed: mapState({
      title () {
        return this.$route.meta.title
      },

      // дата опердня
      ...mapGetters('operationDates', ['activeDate']),

      // выбранный счет
      activeAccountItem (state) {
        return state.accounts.activeAccount
      }
    }),
    methods: {

      // фильтр по дате изменился
      async onFilteredDate () {

        const { OpDate = null } = this.activeDate || {}

        this.$store.commit('changeLoader', true)

        await this.$store.dispatch('accountBalance/filterItems', OpDate)

        this.$store.commit('changeLoader', false)
      }
    }
  }
</script>

<style lang="sass" scoped>
  .title
    margin-top: 40px

  .tables__wrp
    margin-top: 40px
    padding-bottom: 100px

  .table__entry
    margin-left: 40px
</style>
