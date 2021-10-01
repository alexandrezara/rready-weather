<template>
  <div v-if="loading" class="app-weather-card">
    <h2>LOADING</h2>
  </div>
  <div v-else class="app-weather-card">
    <h2>{{ city }}</h2>
    <div class="main-info">
      <app-tempetature :kelvin="weather.main.temp" :unit="unit" /> -
      <span>{{ weather.weather[0].main }}</span>
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
      unit: TemperatureUnit.Celsius,
      loading: true,
    };
  },
  methods: {
    reloadData() {
      this.loading = true;
      this.$api
        .weather(this.city)
        .then((data) => {
          this.weather = data;
          this.loading = false;
        })
        .catch((error) => {
          alert(error);
          this.loading = false;
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
