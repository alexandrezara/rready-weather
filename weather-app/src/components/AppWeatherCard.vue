<template>
  <div class="app-weather-card" :class="[state]">
    <span class="title">{{ city!.city }}</span>
    <span class="subtitle">{{ city!.subtitle }}</span>
    <!-- <div v-if="state == 'info'" class="info">
      <div class="temperature">{{ temperature }}</div>
      <div class="condition">{{ condition }}</div>
    </div> -->
    <div v-if="state == 'info'" class="info" style="font-size: 12px;">
      <div v-if="configTemperature">
        Min: {{ temperatureMin }} <br />Max:
        {{ temperatureMax }}
      </div>
      <div v-if="configSunriseSunset">
        Sunrise: {{ sunrise }} / Sunset: {{ sunset }}
      </div>
      <div v-if="configWindSpeed">Wind: {{ windSpeed }}</div>
    </div>
    <div v-else-if="state == 'config'" class="config">
      <app-checkbox v-model="configTemperature" text="Min/max temperature" />
      <app-checkbox v-model="configSunriseSunset" text="Sunrise/sunset" />
      <app-checkbox v-model="configWindSpeed" text="Wind speed" />
    </div>
    <!-- <div v-else-if="state == 'moving'" class="moving">
      <app-icon src="icon-move.svg" />
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, WeatherConfig } from "vue";
import AppTempetature from "./AppTempetature.vue";
import { TemperatureUnit } from "@/helpers/Temperature";
import AppIcon from "./base/AppIcon.vue";
import AppCheckbox from "./base/AppCheckbox.vue";
import { Time, Temperature } from "@rready/weather-sdk";

export default defineComponent({
  name: "AppWeatherCard",
  components: {
    AppTempetature,
    AppIcon,
    AppCheckbox,
  },
  props: {
    city: Object as PropType<WeatherConfig>,
  },
  data: function() {
    return {
      temperatureUnit: TemperatureUnit.Celsius,
      configTemperature: false,
      configSunriseSunset: false,
      configWindSpeed: false,
    };
  },
  computed: {
    state() {
      return this.$store.state.settings ? "config" : "info";
    },
    temperature() {
      return Temperature.build(
        this.city?.weather?.main.temp,
        TemperatureUnit.Celsius
      )?.format();
    },
    condition() {
      return this.city?.weather?.weather[0].main;
    },
    temperatureMin() {
      return Temperature.build(this.city?.weather?.main.temp_min, 1)?.format();
    },
    temperatureMax() {
      return Temperature.build(this.city?.weather?.main.temp_max, 1)?.format();
    },
    sunrise() {
      const times = this.city?.weather?.sys.sunrise!;
      const offset = (this.city?.weather as any).timezone!;
      return Time.build(times, offset)?.format();
    },
    sunset() {
      const times = this.city?.weather?.sys.sunset!;
      const offset = (this.city?.weather as any).timezone!;
      return Time.build(times, offset)?.format();
    },
    windSpeed() {
      return `${this.city?.weather?.wind.speed} m/s`;
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
  min-height: 180px
  padding: $size-border-radius
  border-radius: $size-border-radius
  overflow: hidden

  &.info
    @include drop-shadow

  .title
    display: inline-block
    font-size: $font-medium
    line-height: 1

  .subtitle
    display: inline-block
    font-size: $font-small
    margin-bottom: $space-small

  .info
    position: relative
    flex-grow: 1
    text-align: center

    .temperature
      font-size: $font-huge

    .condition
      font-size: $font-medium

  .app-checkbox
    font-size: $font-small

  .moving
    position: relative
    display: flex
    flex-grow: 1
    align-items: center
    justify-content: center
    user-select: none
</style>
