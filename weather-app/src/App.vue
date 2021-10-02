<template>
  <div class="main-layout">
    <header>
      <h1>rready weather</h1>
      <nav>
        <app-search />
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppSearch from "@/components/AppSearch.vue";

export default defineComponent({
  name: "App",
  components: {
    AppSearch,
  },
});
</script>

<style lang="sass">
@import '~sanitize.css'

#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: $color-text-black

  .main-layout
    display: flex
    flex-direction: column
    align-items: stretch
    min-height: 100vh

    header
      text-align: center
      background-color: $color-purple
      padding-bottom: 36px

      h1
        font-size: 3em
        margin-bottom: 16px
        color: white

      nav
        display: inline-block
        max-width: 400px

    main
      flex-grow: 1
      max-width: 960px
      //background-color: #ffffff
</style>
