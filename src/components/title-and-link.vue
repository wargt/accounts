<template lang="html">
  <div class="flex">
    <div class="flex-auto">
      <text-main class="table__title" :text="title" />
    </div>
    <div class="flex-item" v-if="link">
      <span class="link__span" @click="$emit('linkClicked')">{{link}}</span>
    </div>
  </div>
</template>

<script>
  import TextMain from '@/components/text/text-main'

  export default {
    name: 'TitleAndLink',
    components: {
      'text-main': TextMain,
    },
    props: {
      title: {
        type: String,
        required: true
      },
      link: {
        type: String
      }
    }
  }
</script>

<style lang="sass" scoped>
  .table__title
    margin-bottom: 20px
    font-weight: 500

  .link__span
    margin-left: 20px
    color: #007cff

  .link__span:hover
    color: #ff6b00
    cursor: pointer
</style>
