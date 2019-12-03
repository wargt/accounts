<template lang="html">
  <div class="v__icon" :class="{clicked__icon: clickedIcon, center}" @click="onIconClicked">
    <slot/>
  </div>
</template>

<script>
// компонент иконки (любой)
export default {
  name: 'vIcon',
  props: {
    clickedIcon: { // кликабельная иконка или нет
      type: Boolean,
      default: false
    },
    stopEventPropagation: { // при клике событие не всплывает
      type: Boolean,
      default: true
    },
    center: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onIconClicked (e) {
      if (!this.clickedIcon) {
        return
      }

      if (this.stopEventPropagation) {
        e.stopPropagation()
      }

      this.$emit('click')
    }
  }
}
</script>

<style lang="sass" scoped>
.v__icon
  transition: transform 0.2s, opacity 0.2s
  transform-origin: center center

.v__icon /deep/ img
  max-width: 20px
  display: block

.v__icon.clicked__icon
   opacity: 0.4
   cursor: pointer

.v__icon.center
  display: flex
  justify-content: center

.v__icon.clicked__icon:hover
   transform: scale(1.1)
   opacity: 1
</style>
