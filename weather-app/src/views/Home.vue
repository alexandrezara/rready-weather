<template>
  <div class="home">
    <ul class="city-list">
      <li v-for="city in cityList">
        <app-draggable-card
          :index="city.order"
          :active="editingMode"
          @drag-and-drop="moveCards"
        >
          <app-weather-card :widget="city" />
        </app-draggable-card>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppWeatherCard from "@/components/AppWeatherCard.vue";
import AppDraggableCard from "@/components/AppDraggableCard.vue";
import { ICityWeather } from "@rready/weather-sdk";
import { IWeather } from "@/model/IWeather";

export default defineComponent({
  name: "Home",
  components: { AppWeatherCard, AppDraggableCard },
  created() {
    this.reloadData();
  },
  data: function() {
    return {};
  },
  computed: {
    cityList() {
      return this.$store.state.widgets.sort((a, b) => {
        return a.order - b.order;
      });
    },
    editingMode() {
      return this.$store.state.settings;
    },
  },
  methods: {
    moveCards(data: any) {
      this.$store.commit("moveCity", data);
    },
    reloadData() {
      this.cityList.forEach((item) => {
        this.$api
          .weather(item.cityName)
          .then((data) => {
            this.$store.commit("updateWeather", {
              city: item.cityName,
              weather: this.convertWeather(data),
            });
          })
          .catch((error) => {
            alert(error);
          });
      });
    },
    convertWeather(response: ICityWeather): IWeather {
      return {
        temp: response.main.temp,
        pressure: response.main.pressure,
        humidity: response.main.humidity,
        temp_min: response.main.temp_min,
        temp_max: response.main.temp_max,
        condition: {
          name: response.weather[0].main,
          description: response.weather[0].description,
          icon: response.weather[0].icon,
        },
        visibility: response.visibility,
        windSpeed: response.wind.speed,
        windDeg: response.wind.deg,
        country: response.sys.country,
        sunrise: response.sys.sunrise,
        sunset: response.sys.sunset,
        timezone: response.timezone,
      };
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
