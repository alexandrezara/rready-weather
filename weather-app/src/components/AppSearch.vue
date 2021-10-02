<template>
  <div class="app-search">
    <input
      class="search-input"
      type="text"
      v-model="searchString"
      @focusin="updateFocus(true)"
      @focusout="updateFocus(false)"
      placeholder="Type a city here"
    />
    <div class="search-icon">
      <img src="@/assets/icon-search.svg" />
    </div>

    <div class="search-results" v-if="showPredictions">
      <div class="search-result-item" v-for="item in autocomplete?.predictions">
        <span class="text">{{ item.description }}</span>
        <img class="icon" src="@/assets/icon-add.svg" />
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
      autocomplete: {} as IAutocomplete | undefined,
    };
  },
  watch: {
    searchString(value: string, _: any) {
      if (value.length <= 2) {
        this.autocomplete = undefined;
      } else {
        service
          .autocomplete(value)
          .then(this.autocompleteUpdate)
          .catch(this.autocompleteFail);
      }
    },
  },
  computed: {
    showPredictions(): boolean {
      return (
        this.focus &&
        this.autocomplete != undefined &&
        this.autocomplete.predictions?.length > 0
      );
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
$size: 42px
$half-size: math.div($size, 2)

.app-search
  position: relative
  display: flex
  flex-direction: row
  align-items: center
  gap: $space-small

  .search-input
    flex-grow: 1
    height: $size
    padding: 0 $half-size
    border: 2px solid white
    border-radius: $half-size
    font-size: $font-large
    outline: 0
    color: darken(grey, 20%)
    @include drop-shadow

    &:hover
      border: 2px solid darken(white, 5%)

    &:focus
      border: 2px solid lighten(blue, 40%)

    &::placeholder
      color: lighten(grey, 30%)
      user-select: none

  .search-icon
    width: $size
    height: $size
    padding: 8px
    border-radius: $half-size
    background-color: white

    img
      width: 100%
      height: 100%

  .search-results
    z-index: 10
    position: absolute
    top: $size + 6px
    padding: $half-size 0
    width: 100%
    border-radius: $half-size
    background-color: white
    @include drop-shadow()

    .search-result-item
      display: flex
      flex-direction: row
      align-items: center
      margin: 2px 0
      padding: 4px 6px 4px $half-size
      cursor: pointer

      &:hover
        background-color: lighten($color-purple, 40%)

      .text
        text-align: start
        flex-grow: 1

      .icon
        width: $size - 12px
        height: $size - 12px
</style>
