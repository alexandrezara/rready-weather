<template>
  <div class="app-weather-card" :class="cssClasses">
    <span class="title">{{ city!.city }}</span>
    <span class="subtitle">{{ city!.subtitle }}</span>

    <div v-if="isLoading">Loading</div>

    <app-weather-card-config
      v-else-if="showSettings"
      :settings="city?.config!"
      @update-settings="updateSettings"
    />

    <app-weather-card-main
      v-else-if="showingPanel(0)"
      :weather="city?.weather!"
      :unit="temperatureUnit"
    />

    <app-weather-card-extra
      v-else-if="showingPanel(1)"
      :weather="city?.weather!"
      :config="city?.config!"
      :unit="temperatureUnit"
    />

    <app-icon
      v-if="showIconNext"
      class="action-icon"
      src="icon-next.svg"
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
    showIconNext() {
      return !this.isLoading && !this.showSettings && this.haveExtraInfo;
    },
    haveExtraInfo() {
      return (
        this.city?.config.minMaxtemperature ||
        this.city?.config.sunsetSunrise ||
        this.city?.config.windSpeed
      );
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
    updateSettings(settings: any) {
      this.$store.commit("updateSettingsConfig", {
        city: this.city?.city,
        settings: settings,
      });
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

  .action-icon
    align-self: flex-end
</style>
