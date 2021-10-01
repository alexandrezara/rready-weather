<template>
  <div v-if="!city" class="app-weather-card">
    <h2>Loading</h2>
  </div>
  <div v-else class="app-weather-card">
    <h2>{{ city.city }}</h2>
    <div class="main-info">
      <app-tempetature :kelvin="temperature" :unit="temperatureUnit" />
      -
      <span>{{ condition }}</span>
    </div>
    <div class="additional-info"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, WeatherConfig } from "vue";
import AppTempetature from "./AppTempetature.vue";
import { TemperatureUnit } from "@/helpers/Temperature";

export default defineComponent({
  name: "AppWeatherCard",
  components: {
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
  border: 1px solid grey
  width: 250px
  height: 350px
</style>
