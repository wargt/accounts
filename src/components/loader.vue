<template lang="html">
  <div class="loader">
    <div class="lds-dual-ring"></div>
  </div>
</template>

<script>
  export default {
    name: 'Loader'
  }
</script>

<style lang="sass" scoped>
  .loader
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 10
    background-color: rgba(255,255,255, .7)

  .lds-dual-ring
    width: 60px
    height: 60px
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -100%)

  .lds-dual-ring:after
    content: " "
    display: block
    width: 60px
    height: 60px
    border-radius: 50%
    border: 6px solid #f7af0d
    border-color: #f7af0d transparent #f7af0d transparent
    animation: lds-dual-ring 1.2s linear infinite

  @keyframes lds-dual-ring
    0%
      transform: rotate(0deg)
    100%
      transform: rotate(360deg)
</style>
