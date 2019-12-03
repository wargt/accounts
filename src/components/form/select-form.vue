<template lang="html">
  <div class="select__form__wrp">
    <div class="select__cnt">
      <input
        class="input__form"
        :class="{ infocus: inFocus || optionsPressed }"
        :placeholder="currentLabel && !inFocus ? '' : placeholder"
        v-model="filterText"
        autocomplete="off"
        @focus="inFocus = true"
        @blur="onBlurInput"
        ref="search"
        type="text"
      >
      <div class="select__label" v-show="currentLabel && !inFocus">{{currentLabel}}</div>
      <div class="arrow__icon__wrp">
        <img src="@/assets/img/input-droplist.svg" :class="{ up__icon: inFocus }" class="arrow__icon">
      </div>
    </div>

    <ul
      v-if="filteredOptions.length"
      class="options__items"
      v-show="inFocus"
      ref="options"
      :key="getListKey()"
      @mousedown="optionsPressed = true">
      <li
        class="option__item"
        v-for="(option,index) in filteredOptions"
        :key="`${option.value}${index}`"
        @click.stop="optionClicked(option.value)"
      >
        {{option.label}}
      </li>
      <li v-show="!filteredOptions.length && filterText" class="empty__item">
        Ничего не найдено
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'SelectForm',
    props: {
      value: {
        type: [String, Number]
      },
      placeholder: {
        type: String,
        default: ''
      },
      options: {
        type: Array,
        prop: {
          label: String,
          value: [String, Number]
        }
      },
    },
    data () {
      return {
        filterText: '', // поиск в списке
        currentLabel: '', // label выбранного элемента
        observableValue: this.value, // value выбранного элемента
        inFocus: false,
        optionsPressed: false, // зажали мышкой на блоке options
        blurTime: null
      }
    },
    mounted () {
      if (this.observableValue && this.options.length) {
        this.selectOption(this.observableValue)
      }
    },
    computed: {
      filteredOptions () {

        if (!this.filterText) {
          return this.options
        }

        const filter = String(this.filterText).toLowerCase()

        return this.options.filter(option => {
          const label = String(option.label).toLowerCase()

          return ~label.indexOf(filter)
        })
      }
    },
    methods: {
      onBlurInput () {
        if (this.optionsPressed) {
          return
        }

        this.inFocus = false

        this.filterText = ''

        this.selectOption(this.observableValue)

        this.blurTime = new Date().getTime()
      },

      optionClicked (value) {
        this.filterText = ''
        this.selectOption(value)
        this.inFocus = false
        this.optionsPressed = false
      },

      selectOption (value, emitValue = true) {

        const currentLabel = this.getCurrentLabel(value)

        if (currentLabel) {
          const oldValue = this.observableValue

          this.observableValue = value

          this.currentLabel = currentLabel

          if (emitValue) {
            this.$emit('input', value)

            if (value !== oldValue) {
              this.$emit('change', value)
            }
          }
        }

        if (this.$refs.search) {
          this.$refs.search.value = ''
        }
      },

      getCurrentLabel (value, options = []) {
        options = options.length ? options : this.options.slice()

        const option = options.find(option => option.value === value)

        return option ? option.label : ''
      },

      getListKey () {
        return String(Math.random())
      },
    },
    watch: {
      value (value) {

        if (!this.getCurrentLabel(value)) {
          return
        }

        this.selectOption(value, false)
      },
      options (options) {

        if (!this.getCurrentLabel(this.observableValue, options)) {
          return
        }

        this.selectOption(this.observableValue)
      }
    }
  }
</script>

<style lang="sass" scoped>
  .select__form__wrp,
  .select__cnt
    position: relative

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

  .arrow__icon__wrp
    width: 35px
    height: 44px
    position: absolute
    top: 0
    right: 0
    cursor: pointer
    user-select: none

  .arrow__icon
    position: absolute
    top: 50%
    right: 14px
    display: block
    width: 10px
    height: 6px
    transform: translateY(-50%)
    pointer-events: none

  .load__icon
    position: absolute
    top: 50%
    right: 14px
    transform: translateY(-50%)

  .arrow__icon.up__icon
    transform: rotate(180deg) translateY(50%)

  .options__items
    margin: 0
    list-style-type: none
    position: absolute
    top: 52px
    left: 0
    right: 0
    background-color: white
    z-index: 10
    border: 2px solid #afafaf
    border-radius: 5px
    padding: 5px 0
    max-height: 158px
    overflow-y: auto

  .option__item,
  .empty__item
    padding: 10px 14px
    font-size: 15px
    cursor: pointer
    letter-spacing: 0.2px

  .empty__item
    cursor: default
    color: #888

  .option__item:hover
    background-color: rgba(0,0,0, .05)

  .select__label
    position: absolute
    left: 20px
    top: 50%
    transform: translateY(-50%)
    font-size: 14px
    font-weight: 500
</style>
