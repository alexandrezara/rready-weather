<template>
  <div class="app-weather-card-main">
    <div class="temperature">{{ temperature }}</div>
    <div class="condition">{{ condition }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Temperature, TemperatureUnit } from "@rready/weather-sdk";
import { IWeather } from "@/model/IWeather";

export default defineComponent({
  name: "AppWeatherCardMain",
  components: {},
  props: {
    weather: {
      type: Object as PropType<IWeather>,
      required: true,
    },
    unit: {
      type: Number as PropType<TemperatureUnit>,
      required: true,
    },
  },
  data: function() {
    return {};
  },
  computed: {
    temperature() {
      return Temperature.build(this.weather.temp, this.unit)?.format();
    },
    condition() {
      return this.weather.condition.name;
    },
  },
});
</script>

<style scoped lang="sass">
.app-weather-card-main
  position: relative
  flex-grow: 1
  text-align: center

  .temperature
    font-size: $font-huge

  .condition
    font-size: $font-medium
</style>
