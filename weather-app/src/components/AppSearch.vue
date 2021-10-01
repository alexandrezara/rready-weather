<template>
  <div class="app-search">
    <input
      class="search-input"
      type="text"
      v-model="searchString"
      @focusin="updateFocus(true)"
      @focusout="updateFocus(false)"
    />
    <div class="search-results" v-if="showPredictions">
      <div v-for="item in autocomplete.predictions">
        <span>{{ item.description }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  AutocompleteService,
  IAutocomplete,
} from "@/helpers/AutocompleteService";
import { AxiosResponse } from "axios";
import { defineComponent } from "vue";
const service = new AutocompleteService(
  process.env.VUE_APP_PLACES_URL,
  process.env.VUE_APP_PLACES_KEY
);

export default defineComponent({
  name: "AppSearch",
  data: function() {
    return {
      searchString: "",
      focus: false as boolean,
      autocomplete: {} as IAutocomplete,
    };
  },
  watch: {
    searchString(value: string, _: any) {
      if (value.length > 2) {
        service
          .autocomplete(value)
          .then(this.autocompleteUpdate)
          .catch(this.autocompleteFail);
      }
    },
  },
  computed: {
    showPredictions(): boolean {
      return this.focus && this.autocomplete?.predictions?.length > 0;
    },
  },
  methods: {
    autocompleteUpdate(success: AxiosResponse<IAutocomplete>) {
      this.autocomplete = success.data;
    },
    autocompleteFail(error: any) {
      console.log(error);
    },
    updateFocus(status: boolean) {
      this.focus = status;
    },
  },
});
</script>

<style scoped lang="sass">
.search-input
  width: 300px
.search-results
  position: absolute
  width: 300px
  height: 100px
  background-color: red
</style>
