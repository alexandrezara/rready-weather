<template>
  <div class="main-layout">
    <h1>Weather</h1>
    <app-search />

    <div class="main-content">
      <router-view />
    </div>
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

  .main-layout
    display: flex
    flex-direction: column
    min-height: 100vh

  .main-content
    flex-grow: 1
</style>
