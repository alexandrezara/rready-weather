<template>
  <div class="main-layout">
    <div class="debug">
      <strong>Debug</strong>
      <div><input type="checkbox" v-model="debugNetwork" /> Network</div>
    </div>
    <header>
      <h1>rready weather</h1>
      <nav>
        <app-search @select-item="addWidget" />
        <app-icon
          src="icon-settings.svg"
          :clicable="true"
          @click="toggleConfiguringMode"
        />
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
import AppIcon from "@/components/base/AppIcon.vue";
import { IAutocompleteItem } from "./services/AutocompleteService";
import { IMutationWidgetAdd } from "./store/mutations";

export default defineComponent({
  name: "App",
  components: {
    AppSearch,
    AppIcon,
  },
  data: function() {
    return {
      debugNetwork: this.$store.state.networkOn,
    };
  },
  methods: {
    addWidget(item: IAutocompleteItem) {
      const payload = this.convert(item);
      this.$store.commit("widgetAdd", payload);
    },
    toggleConfiguringMode() {
      this.$store.commit("toggleConfiguringMode");
    },
    convert(item: IAutocompleteItem): IMutationWidgetAdd {
      return {
        cityName: item.structured_formatting.main_text,
        cityLocation:
          item.terms.length > 1 ? item.terms[item.terms.length - 1].value : "",
      };
    },
  },
  watch: {
    debugNetwork(value: boolean, _: any) {
      this.$store.commit("_debug_updateNetwork", value);
    },
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

  .debug
    position: absolute
    top: 50px
    left: 30px
    width: 100px
    padding: 8px
    color: transparent
    text-align: center

    div
      display: none

    &:hover
      color: black
      background-color: #d1cc6d

      > div
        display: block

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
        margin-top: 16px
        margin-bottom: 16px
        color: white

      nav
        display: flex
        justify-content: center
        gap: $space-small

    main
      flex-grow: 1
      max-width: 960px
      margin: 0 auto
      padding: $space-large 0
</style>
