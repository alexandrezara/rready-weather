<template>
  <div class="app-weather-card-config">
    <app-checkbox v-model="showTemperature" text="Min/max temperature" />
    <app-checkbox v-model="showSunrise" text="Sunrise/sunset" />
    <app-checkbox v-model="showWindSpeed" text="Wind speed" />
  </div>
</template>

<script lang="ts">
import { IWidgetSettings } from "@/model/IWidget";
import { defineComponent, PropType } from "vue";
import AppCheckbox from "./base/AppCheckbox.vue";

export default defineComponent({
  name: "AppWeatherCardMain",
  components: {
    AppCheckbox,
  },
  props: {
    settings: {
      type: Object as PropType<IWidgetSettings>,
      required: true,
    },
  },
  data: function() {
    return {
      showTemperature: this.settings.showTemperature,
      showSunrise: this.settings.showSunrise,
      showWindSpeed: this.settings.showWindSpeed,
    };
  },
  computed: {
    config() {
      return {
        showTemperature: this.showTemperature,
        showSunrise: this.showSunrise,
        showWindSpeed: this.showWindSpeed,
      };
    },
  },
  watch: {
    showTemperature() {
      this.$emit("update-settings", this.config);
    },
    showSunrise() {
      this.$emit("update-settings", this.config);
    },
    showWindSpeed() {
      this.$emit("update-settings", this.config);
    },
  },
});
</script>

<style scoped lang="sass">
.app-weather-card-config
  text-align: center

  .app-checkbox
    font-size: $font-small
</style>
