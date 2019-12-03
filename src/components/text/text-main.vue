<script>
  import TextMixin from './text-mixin'

  export default {
    name: 'TextMain',
    mixins: [TextMixin],
    render: function (h) {
      return h('div', this.text)
    }
  }
</script>

<style lang="sass" scoped>
  div
    font-size: 16px
</style>
