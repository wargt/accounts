<template lang="html">
  <div class="btn__wrp">
    <button class="button__form" :class="buttonClass" @click="$emit('click')">{{name}}</button>
  </div>
</template>

<script>
  export default {
    name: 'ButtonForm',
    props: {
      name: { // наименование кнопки
        type: String,
        required: true
      },
      color: {
        type: String,
        default: 'orange',
        validator (value) {
          return ['orange', 'gray'].indexOf(value) !== -1
        }
      }
    },
    computed: {
      buttonClass () {
        return {
          color__orange: this.color === 'orange',
          color__gray: this.color === 'gray',
        }
      },
    }
  }
</script>

<style lang="sass" scoped>
  .btn__wrp
    display: inline-block
    position: relative

  .button__form
    outline: none
    box-sizing: border-box
    position: relative
    z-index: 2
    border-radius: 4px
    border: 0
    margin: 0
    box-shadow: none
    cursor: pointer
    white-space: nowrap
    transition: background-color 0.2s
    color: white
    padding: 11px 14px
    font-size: 15px
    line-height: 1.53
    letter-spacing: 0.1px
    min-width: 104px

  .color__orange
    background-color: #f3741a

  .color__gray
    background-color: #efefef
    color: #3f3f3f
</style>
