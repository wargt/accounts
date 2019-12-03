<template>
  <div id="app" class="flex flex-column">
    <v-header class="flex-auto" />
    <div class="flex-item">
      <loader v-show="isLoading" />
      <v-popup />
      <v-confirm />
      <router-view />
    </div>
  </div>
</template>

<script>
import '@/assets/css/main.sass'
import '@/assets/css/flex.css'
import vHeader from '@/components/v-header'
import Loader from '@/components/loader'
import vPopup from '@/components/v-popup'
import vConfirm from '@/components/v-confirm'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    'v-header': vHeader,
    'v-popup': vPopup,
    'v-confirm': vConfirm,
    loader: Loader
  },
  computed: mapState({
    isLoading (state) {
      return state.showLoader
    }
  })
}
</script>

<style lang="sass" scoped>
</style>
