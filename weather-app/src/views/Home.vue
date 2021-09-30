<template>
  <div class="home">
    <ul class="city-list">
      <li v-for="city in cities">
        <app-weather-card
          city="Cidade Aqui"
          :temperature="30"
          condition="Clear"
        />
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
    return {
      cities: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
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
