<template>
  <div
    class="app-search"
    @focusin="udpateFocus(true)"
    @focusout="udpateFocus(false)"
  >
    <input
      class="search-input"
      type="text"
      v-model="searchString"
      placeholder="Type a city here"
    />
    <app-icon class="search-icon" src="icon-search.svg" />

    <div class="search-results" v-if="showPredictions">
      <div v-for="item in autocomplete?.predictions">
        <div class="search-result-item" @click="selectResult(item)">
          <span class="text">{{ item.description }}</span>
          <img class="icon" src="@/assets/icon-add.svg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  AutocompleteService,
  IAutocomplete,
} from "@/services/AutocompleteService";
import AppIcon from "@/components/base/AppIcon.vue";
import { AxiosResponse } from "axios";
import { defineComponent } from "vue";
const service = new AutocompleteService(
  process.env.VUE_APP_PLACES_URL,
  process.env.VUE_APP_PLACES_KEY
);

export default defineComponent({
  name: "AppSearch",
  components: {
    AppIcon,
  },
  emits: ["select-item"],
  data: function() {
    return {
      searchString: "",
      focusInput: false as boolean,
      focusPredictions: false as boolean,
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
        this.focusInput &&
        this.autocomplete != undefined &&
        this.autocomplete.predictions?.length > 0
      );
    },
  },
  methods: {
    clear() {
      this.searchString = "";
    },
    autocompleteUpdate(success: AxiosResponse<IAutocomplete>) {
      this.autocomplete = success.data;
    },
    autocompleteFail(error: any) {
      console.log(error);
    },
    udpateFocus(status: boolean) {
      setTimeout(() => {
        this.focusInput = status;
      }, 100);
    },
    selectResult(item: any) {
      this.$emit("select-item", item);
      this.clear();
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

  @media screen and (max-width: 420px)
    .search-icon
      display: none

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
        background-color: $color-purple-light

      .text
        text-align: start
        flex-grow: 1

      .icon
        width: $size - 12px
        height: $size - 12px
</style>
