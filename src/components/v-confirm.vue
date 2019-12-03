<template lang="html">
  <div class="v__popup" @click="closeClicked" v-if="showPopup">
    <div class="popup__window" @click.stop>
      <div class="close__wrp" @click="closeClicked">
        <img class="close__icon" src="@/assets/img/remove-item.svg" />
      </div>

      <text-title class="title" :text="title" />
      <text-main class="desc" :text="desc" />

      <button-form name="Удалить" @click="confirmClicked" />
      <button-form class="cancel__btn" name="Отменить" color="gray" @click="closeClicked" />
    </div>
  </div>
</template>

<script>
  import TextTitle from '@/components/text/text-title'
  import TextMain from '@/components/text/text-main'
  import ButtonForm from '@/components/form/button-form'

  export default {
    name: 'vConfirm',
    components: {
      'text-title': TextTitle,
      'text-main': TextMain,
      'button-form': ButtonForm
    },
    mounted () {
      this.$globalEvents.$on('openConfirmDialog', this.onOpenDialog)
    },
    beforeDestroy () {
      this.$globalEvents.$off(['openConfirmDialog'])
    },
    data () {
      return {
        showPopup: false,
        title: '', // заголовок окна
        desc: '', // описание
        onConfirm: null,
      }
    },
    methods: {

      // показываем всплывающее окно
      onOpenDialog ({ title, desc, onConfirm = (() => {}) }) {
        this.title = title
        this.desc = desc
        this.showPopup = true
        this.onConfirm = onConfirm
      },

      closeClicked () {
        this.showPopup = false
        this.title = ''
        this.desc = ''
        this.onConfirm = null
      },

      confirmClicked () {
        if (typeof this.onConfirm === 'function') {
          this.onConfirm()
        }

        this.closeClicked()
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
    width: 350px
    padding: 20px
    border-radius: 4px
    background-color: white
    margin-bottom: 40px
    margin-top: 100px

  .title
    margin-bottom: 20px

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

  .desc
    color: #666
    margin-bottom: 20px

  .cancel__btn
    margin-left: 20px
</style>
