<template lang="html">
  <div class="g-container">
    <text-title class="title" :text="title" />

    <div class="flex tables__wrp">
      <div class="flex-item">
        <operation-dates-table />
      </div>
      <div class="flex-item table__entry">
        <entries-table v-if="activeDate" />
      </div>
    </div>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import TextTitle from '@/components/text/text-title'
  import OperationDatesTable from './components/operation-dates-table'
  import EntriesTable from './components/entries-table'

  export default {
    name: 'OperationDates',
    components: {
      'text-title': TextTitle,
      'operation-dates-table': OperationDatesTable,
      'entries-table': EntriesTable
    },
    computed: {
      // дата опердня
      ...mapGetters('operationDates', ['activeDate']),

      title () {
        return this.$route.meta.title
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
