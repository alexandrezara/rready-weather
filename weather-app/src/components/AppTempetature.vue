<template>
  <span class="app-temperature">{{ temperature.format() }}</span>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Temperature, TemperatureUnit } from "@/helpers/Temperature";

export default defineComponent({
  name: "AppTemperature",
  props: {
    kelvin: {
      type: Number,
      required: false,
      default: 0,
    },
    unit: {
      type: Number as PropType<TemperatureUnit>,
      required: true,
    },
  },
  computed: {
    temperature() {
      return new Temperature(this.kelvin, this.unit);
    },
  },
});
</script>

<style scoped lang="sass"></style>
