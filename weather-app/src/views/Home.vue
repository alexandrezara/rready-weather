<template>
  <div class="home">
    <ul class="city-list">
      <li v-for="city in cityList">
        <app-weather-card :city="city" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppWeatherCard from "@/components/AppWeatherCard.vue";

export default defineComponent({
  name: "Home",
  components: { AppWeatherCard },
  data: function() {
    return {};
  },
  computed: {
    cityList() {
      return this.$store.state.cities;
    },
  },
});
</script>

<style scoped lang="sass">
ul.city-list
  display: flex
  flex-wrap: wrap
  justify-content: center
  gap: $space-medium
  list-style-type: none
  padding: 0
  margin: 0
</style>
