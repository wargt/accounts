<template lang="html">
  <header class="header">
    <div class="flex flex-vmiddle header__block g-container">
      <div class="flex-auto">
        <div class="logo">
          <div class="logo__title">Мои счета</div>
          <div class="logo__desc">тестовое задание</div>
        </div>
      </div>
      <div class="flex-auto">
        <menu>
          <ul class="menu">
            <li
              v-for="(item,index) in menuItems"
              :key="index"
              class="menu__item">
              <router-link :to="item.path">{{item.title}}</router-link>
            </li>
          </ul>
        </menu>
      </div>
    </div>
  </header>
</template>

<script>
  import routes from '@/routes'

  export default {
    name: 'vHeader',
    computed: {
      menuItems () {
        return routes.map(route => ({
          path: route.path,
          title: route.meta.title
        }))
      }
    }
  }
</script>

<style lang="sass" scoped>
  .header
    background-color: white

  .header,
  .header__block,
  .menu__item,
  .menu__item a
    height: 70px

  .logo__title
    font-size: 22px
    font-weight: 600
    line-height: 1

  .logo__desc
    font-size: 12px
    color: #777
    line-height: 1

  menu
    margin: 0
    padding: 0

  .menu
    list-style-type: none
    margin: 0
    padding: 0
    margin-left: 60px

  .menu__item
    float: left

  .menu__item a
    text-decoration: none
    line-height: 70px
    color: #222
    display: block
    font-weight: 500
    transition: color 0.2s

  .menu__item a:hover,
  .router-link-exact-active
    color: #ff6b00 !important

  .menu:after
    display: block
    content: ''
    clear: both

  .menu__item + .menu__item
    margin-left: 30px
</style>
