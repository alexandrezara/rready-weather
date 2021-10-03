<template>
  <div class="app-weather-card-extra">
    <div class="panel-line" v-if="config.minMaxtemperature">
      <div>
        <span class="key">Min:</span>
        <span class="val">{{ temperatureMin }}</span>
      </div>
      <div>
        <span class="key">Max:</span>
        <span class="val">{{ temperatureMax }}</span>
      </div>
    </div>
    <div class="panel-line" v-if="config.sunsetSunrise">
      <div>
        <span class="key">Sunrise:</span>
        <span class="val">{{ sunrise }}</span>
      </div>
      <div>
        <span class="key">Sunset:</span>
        <span class="val">{{ sunset }}</span>
      </div>
    </div>
    <div class="panel-line" v-if="config.windSpeed">
      <div>
        <span class="key">Wind:</span>
        <span class="val">{{ windSpeed }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import {
  Time,
  Temperature,
  TemperatureUnit,
  ICityWeather,
} from "@rready/weather-sdk";

export default defineComponent({
  name: "AppWeatherCardMain",
  components: {},
  props: {
    weather: {
      type: Object as PropType<ICityWeather>,
      required: true,
    },
    unit: {
      type: Number as PropType<TemperatureUnit>,
      required: true,
    },
    config: {
      type: Object as PropType<{
        minMaxtemperature: boolean;
        sunsetSunrise: boolean;
        windSpeed: boolean;
      }>,
      required: true,
    },
  },
  computed: {
    temperatureMin() {
      return Temperature.build(this.weather.main.temp_min, 1)?.format();
    },
    temperatureMax() {
      return Temperature.build(this.weather.main.temp_max, 1)?.format();
    },
    sunrise() {
      const times = this.weather.sys.sunrise!;
      const offset = (this.weather as any).timezone!;
      return Time.build(times, offset)?.format();
    },
    sunset() {
      const times = this.weather?.sys.sunset!;
      const offset = (this.weather as any).timezone!;
      return Time.build(times, offset)?.format();
    },
    windSpeed() {
      return `${this.weather?.wind.speed} m/s`;
    },
  },
});
</script>

<style scoped lang="sass">
.app-weather-card-extra
  position: relative
  flex-grow: 1
  font-size: $font-small

  .panel-line
    display: flex
    justify-content: flex-start
    gap: $space-small
    line-height: 1
    margin-top: $space-medium

    .key
      display: inline-block
      margin: 0 1px
      font-weight: bold

    .val
      display: inline-block
      margin: 0 1px
</style>
