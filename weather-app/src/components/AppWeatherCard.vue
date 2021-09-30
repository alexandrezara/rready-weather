<template>
  <div class="app-weather-card">
    <h2>{{ city }}</h2>
    <div class="main-info">
      <span>{{ temperature }}</span> - <span>{{ condition }}</span>
    </div>
    <div class="additional-info"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppWeatherCard",
  props: {
    city: {
      type: String,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
  },
  data: function() {
    return {};
  },
});
</script>

<style scoped lang="sass">
.app-weather-card
  border: 1px solid grey
  width: 250px
  height: 350px
</style>
