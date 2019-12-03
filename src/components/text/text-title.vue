<script>
  import TextMixin from './text-mixin'

  export default {
    name: 'TextTitle',
    mixins: [TextMixin],
    render: function (h) {
      return h('h1', this.text)
    }
  }
</script>

<style lang="sass" scoped>
  h1
    font-size: 28px
    margin: 0
</style>
