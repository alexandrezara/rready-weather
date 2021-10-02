<template>
  <div v-if="!city" class="app-weather-card">
    <h2>Loading</h2>
  </div>
  <div v-else class="app-weather-card">
    <!-- app-config /-->
    <span class="city">{{ city.city }}</span>
    <span class="temperature">{{ temperature }}</span>
    <span class="condition">{{ condition }}</span>
    <div class="more"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, WeatherConfig } from "vue";
import AppTempetature from "./AppTempetature.vue";
import AppConfig from "./AppConfig.vue";
import { TemperatureUnit } from "@/helpers/Temperature";

export default defineComponent({
  name: "AppWeatherCard",
  components: {
    AppConfig,
    AppTempetature,
  },
  props: {
    city: Object as PropType<WeatherConfig>,
  },
  data: function() {
    return {
      temperatureUnit: TemperatureUnit.Celsius,
    };
  },
  computed: {
    temperature() {
      return this.city?.weather?.main.temp;
    },
    condition() {
      return this.city?.weather?.weather[0].main;
    },
  },
});
</script>

<style scoped lang="sass">
.app-weather-card
  position: relative
  border: 2px solid #c0d0f0 !important
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  min-width: 200px
  min-height: 150px
  padding: $space-small
  @include drop-shadow
  border-radius: 10px

  .city
    font-size: $font-small
    margin-bottom: $space-small

  .temperature
    font-size: $font-title

  .condition
    font-size: $font-medium
</style>
