<template>
  <div class="app-weather-card">
    <h2>{{ city }}</h2>
    <div class="main-info">
      <app-tempetature :kelvin="weather?.main?.temp" :unit="unit" /> -
      <span>Clear</span>
    </div>
    <div class="additional-info"></div>
  </div>
</template>

<script lang="ts">
import { ICityWeather } from "@rready/weather-sdk";
import { defineComponent } from "vue";
import AppTempetature from "./AppTempetature.vue";
import { TemperatureUnit } from "@/helpers/Temperature";

export default defineComponent({
  name: "AppWeatherCard",
  components: {
    AppTempetature,
  },
  props: {
    city: {
      type: String,
      required: true,
    },
  },
  created() {
    this.reloadData();
  },
  data: function() {
    return {
      weather: {} as ICityWeather,
      unit: TemperatureUnit.Kelvin,
    };
  },
  methods: {
    reloadData() {
      this.$api
        .weather(this.city)
        .then((data) => {
          this.weather = data;
        })
        .catch((error) => {
          alert(error);
        });
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
