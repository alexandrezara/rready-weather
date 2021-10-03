<template>
  <div class="app-weather-card-config">
    <app-checkbox v-model="minMaxtemperature" text="Min/max temperature" />
    <app-checkbox v-model="sunsetSunrise" text="Sunrise/sunset" />
    <app-checkbox v-model="windSpeed" text="Wind speed" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import AppCheckbox from "./base/AppCheckbox.vue";

export default defineComponent({
  name: "AppWeatherCardMain",
  components: {
    AppCheckbox,
  },
  props: {
    settings: Object as PropType<any>,
  },
  data: function() {
    return {
      minMaxtemperature: (this.settings as any).minMaxtemperature as boolean,
      sunsetSunrise: (this.settings as any).sunsetSunrise as boolean,
      windSpeed: (this.settings as any).windSpeed as boolean,
    };
  },
  computed: {
    config() {
      return {
        minMaxtemperature: this.minMaxtemperature,
        sunsetSunrise: this.sunsetSunrise,
        windSpeed: this.windSpeed,
      };
    },
  },
  watch: {
    minMaxtemperature(value: boolean, _: any) {
      this.$emit("update-settings", this.config);
    },
    sunsetSunrise(value: boolean, _: any) {
      this.$emit("update-settings", this.config);
    },
    windSpeed(value: boolean, _: any) {
      this.$emit("update-settings", this.config);
    },
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
