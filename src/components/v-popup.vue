<template lang="html">
  <div class="v__popup" @click="closeClicked" v-if="showPopup">
    <div class="popup__window" @click.stop>
      <div class="close__wrp" @click="closeClicked">
        <img class="close__icon" src="@/assets/img/remove-item.svg" />
      </div>

      <text-title class="title" :text="title" />
      <component :is="component" v-bind="dataComponent" />
    </div>
  </div>
</template>

<script>
  import TextTitle from '@/components/text/text-title'

  export default {
    name: 'vPopup',
    components: {
      'text-title': TextTitle
    },
    mounted () {
      this.$globalEvents.$on('openPopup', this.onOpenPopup)
      this.$globalEvents.$on('closePopup', this.closeClicked)
    },
    beforeDestroy () {
      this.$globalEvents.$off(['openPopup', 'closePopup'])
    },
    data () {
      return {
        showPopup: false,
        title: '', // заголовок окна
        component: null, // компонент реализация окна
        dataComponent: {}, // данные которые нужно передать в компонент
      }
    },
    methods: {

      // показываем всплывающее окно
      onOpenPopup ({ title, component, data = {} }) {
        this.title = title
        this.component = component
        this.dataComponent = data
        this.showPopup = true
      },

      closeClicked () {
        this.showPopup = false
        this.title = ''
        this.component = null
        this.dataComponent = {}
      }
    }
  }
</script>

<style lang="sass" scoped>
  .v__popup
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 9
    overflow-y: auto
    background-color: rgba(0,0,0, .3)

  .popup__window
    position: absolute
    left: 50%
    transform: translateX(-50%)
    min-width: 350px
    padding: 20px
    border-radius: 4px
    background-color: white
    margin-bottom: 40px
    margin-top: 100px

  .title
    margin-bottom: 20px
    padding-right: 40px

  .close__wrp
    position: absolute
    top: 27px
    right: 20px
    cursor: pointer

  .close__icon
    width: 18px
    opacity: 0.5
    transition: opacity 0.2s

  .close__icon:hover
    opacity: 1
</style>
