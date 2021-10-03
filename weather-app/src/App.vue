<template>
  <div class="main-layout">
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
import { IAutocompleteItem } from "./helpers/AutocompleteService";
import { IMutationWidgetAdd } from "./store/mutations";

export default defineComponent({
  name: "App",
  components: {
    AppSearch,
    AppIcon,
  },
  methods: {
    addWidget(item: IAutocompleteItem) {
      this.$store.commit("widgetAdd", this.convert(item));
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
        margin-top: 16px
        margin-bottom: 16px
        color: white

      nav
        display: flex
        justify-content: center

    main
      flex-grow: 1
      max-width: 960px
      margin: 0 auto
      padding: $space-large 0
</style>
