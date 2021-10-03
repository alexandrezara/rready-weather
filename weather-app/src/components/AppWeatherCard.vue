<template>
  <div class="app-weather-card" :class="cssClasses">
    <span class="title">{{ city!.city }}</span>
    <span class="subtitle">{{ city!.subtitle }}</span>

    <div v-if="isLoading">Loading</div>

    <app-weather-card-config v-else-if="showSettings" />

    <app-weather-card-main
      v-else-if="showingPanel(0)"
      :weather="city?.weather!"
      :unit="temperatureUnit"
    />

    <app-weather-card-extra
      v-else-if="showingPanel(1)"
      :weather="city?.weather!"
      :unit="temperatureUnit"
    />
    <app-icon
      v-if="showIcon"
      class="icon-next"
      :src="iconSrc"
      :size="36"
      :clicable="true"
      @click="nextPanel"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, WeatherConfig } from "vue";
import AppIcon from "./base/AppIcon.vue";
import AppCheckbox from "./base/AppCheckbox.vue";
import { TemperatureUnit } from "@rready/weather-sdk";
import AppWeatherCardMain from "./AppWeatherCardMain.vue";
import AppWeatherCardExtra from "./AppWeatherCardExtra.vue";
import AppWeatherCardConfig from "./AppWeatherCardConfig.vue";

const PANEL_COUNT = 2;

export default defineComponent({
  name: "AppWeatherCard",
  components: {
    AppIcon,
    AppCheckbox,
    AppWeatherCardMain,
    AppWeatherCardExtra,
    AppWeatherCardConfig,
  },
  props: {
    city: Object as PropType<WeatherConfig>,
  },
  data: function() {
    return {
      temperatureUnit: TemperatureUnit.Celsius,
      panel: 0,
    };
  },
  computed: {
    isLoading() {
      return this.city?.weather == undefined;
    },
    showSettings() {
      return this.$store.state.settings;
    },
    showIcon() {
      return !this.isLoading;
    },
    iconSrc() {
      return this.showSettings ? "icon-ok.svg" : "icon-next.svg";
    },
    cssClasses() {
      return {
        settings: this.showSettings,
        info: !this.showSettings,
      };
    },
  },
  methods: {
    showingPanel(index: number) {
      return index == this.panel;
    },
    nextPanel() {
      this.panel = (this.panel + 1) % PANEL_COUNT;
    },
  },
});
</script>

<style scoped lang="sass">
.app-weather-card
  position: relative
  border: 2px solid white !important
  display: flex
  flex-direction: column
  align-items: center
  min-width: 220px
  max-width: 220px
  min-height: 190px
  padding: $size-border-radius
  border-radius: $size-border-radius
  overflow: hidden

  &.info
    @include drop-shadow

  &.settings

  .title
    display: inline-block
    font-size: $font-medium
    line-height: 1

  .subtitle
    display: inline-block
    font-size: $font-small
    margin-bottom: $space-small

  .icon-next
    align-self: flex-end
</style>
