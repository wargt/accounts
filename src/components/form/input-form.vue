<template lang="html">
  <div class="input__form__wrp">
    <input
      class="input__form"
      type="text"
      :placeholder="placeholder"
      v-model="observableValue"
      @input="onChangeValue"
    />
  </div>
</template>

<script>
  export default {
    name: 'InputForm',
    props: {
      value: {
        type: [String, Number]
      },
      placeholder: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        observableValue: this.value
      }
    },
    methods: {
      onChangeValue () {
        this.$emit('input', this.observableValue)
      }
    },
    watch: {
      value (value) {
        this.observableValue = value
      }
    }
  }
</script>

<style lang="sass" scoped>
  .input__form
    width: 100%
    box-sizing: border-box
    font-family: inherit
    height: 44px
    border: 2px solid #d8d8d8
    border-radius: 4px
    padding: 0 20px
    outline: none
    transition: border-color 0.2s
    font-size: 15px
    line-height: 1px
    letter-spacing: 0.1px
</style>
