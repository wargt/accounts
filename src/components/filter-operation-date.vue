<template lang="html">
  <div class="filter__block flex flex-vmiddle">
    <div class="flex-auto">
      <text-main class="filter__title" text="Фильтр по дате операции:" />
    </div>
    <div class="flex-item select__wrp">
      <select-form
        :options="dates"
        v-model="date"
        @change="onChangeDate"
      />
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import SelectForm from '@/components/form/select-form'
  import TextMain from '@/components/text/text-main'

  export default {
    name: 'FilterOperationDate',
    components: {
      'select-form': SelectForm,
      'text-main': TextMain
    },
    data () {
      return {
        date: null
      }
    },
    async mounted () {

      const operationDates = await this.$store.dispatch('operationDates/fetchItems')

      const activeDate = operationDates[operationDates.length - 1]

      this.$store.commit('operationDates/changeActiveDate', activeDate.id)

      this.date = activeDate.id

      this.$emit('filter', this.activeDate)
    },
    computed: mapState({
      // дата опердня
      ...mapGetters('operationDates', ['activeDate']),

      dates (state) {
        return state.operationDates.items.map(date => ({
          label: date.OpDate,
          value: date.id
        }))
      }
    }),
    methods: {
      onChangeDate (operationDateId) {
        this.$store.commit('operationDates/changeActiveDate', operationDateId)
        this.$emit('filter', this.activeDate)
      }
    }
  }
</script>

<style lang="sass" scoped>
  .filter__block
    margin-top: 20px
    padding: 20px
    background-color: white
    border-radius: 4px

  .filter__title
    color: #666
    margin-right: 20px

  .select__wrp
    max-width: 200px
</style>
