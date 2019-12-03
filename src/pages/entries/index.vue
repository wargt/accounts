<template lang="html">
  <div class="g-container">
    <text-title class="title" :text="title" />

    <div class="flex tables__wrp">
      <div class="flex-item">
        <entries-table />
      </div>
      <div class="flex-item table__entry">
        <accounts-table v-if="activeEntry" />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import TextTitle from '@/components/text/text-title'
  import EntriesTable from './components/entries-table'
  import AccountsTable from './components/accounts-table'

  export default {
    name: 'Entries',
    components: {
      'text-title': TextTitle,
      'entries-table': EntriesTable,
      'accounts-table': AccountsTable
    },
    computed: {
      // активная проводка
      ...mapGetters('entries', ['activeEntry']),

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
