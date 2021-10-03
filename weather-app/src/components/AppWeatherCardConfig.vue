<template>
  <div class="app-weather-card-config">
    <app-checkbox v-model="configTemperature" text="Min/max temperature" />
    <app-checkbox v-model="configSunriseSunset" text="Sunrise/sunset" />
    <app-checkbox v-model="configWindSpeed" text="Wind speed" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppCheckbox from "./base/AppCheckbox.vue";

export default defineComponent({
  name: "AppWeatherCardMain",
  components: {
    AppCheckbox,
  },
  data: function() {
    return {
      configTemperature: true,
      configSunriseSunset: true,
      configWindSpeed: true,
    };
  },
});
</script>

<style scoped lang="sass">
.app-weather-card-config
  position: relative
  flex-grow: 1
  text-align: center

  .app-checkbox
    font-size: $font-small
</style>
