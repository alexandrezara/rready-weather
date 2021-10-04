<template>
  <div class="home">
    <ul class="widget-list">
      <li v-for="widget in widgets">
        <app-draggable-card
          :index="widget.order"
          :enableDrag="configuringMode"
          @drag-and-drop="updateWidgetOrder"
        >
          <app-weather-card
            :key="widget.cityName"
            :widget="widget"
            @request-weather-update="requestUpdate"
          />
        </app-draggable-card>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppWeatherCard from "@/components/AppWeatherCard.vue";
import AppDraggableCard from "@/components/base/AppDraggable.vue";
import { ICityWeather } from "@rready/weather-sdk";
import { IWeather } from "@/model/IWeather";
import { IWidget } from "@/model/IWidget";
import {
  IMutationWidgetReorder,
  IMutationWidgetUpdateWeather,
} from "@/store/mutations";

export default defineComponent({
  name: "Home",
  components: { AppWeatherCard, AppDraggableCard },
  data: function() {
    return {};
  },
  computed: {
    widgets() {
      const copy = [...this.$store.state.widgets];
      return copy.sort((a: IWidget, b: IWidget) => {
        return a.order - b.order;
      });
    },
    configuringMode() {
      return this.$store.state.configuringMode;
    },
  },
  methods: {
    updateWidgetOrder(data: IMutationWidgetReorder) {
      this.$store.commit("widgetReorder", data);
    },
    requestUpdate(city: string) {
      console.log("Request Update: " + city);
      this.$api
        .weather(city)
        .then((response) => {
          this.successWeather(city, response);
        })
        .catch((error) => {
          alert(error);
        });
    },
    successWeather(city: string, response: ICityWeather) {
      const weather = this.convertWeather(response);
      this.$store.commit("widgetUpdateWeather", {
        city: city,
        weather: weather,
      } as IMutationWidgetUpdateWeather);
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
ul.widget-list
  display: flex
  flex-wrap: wrap
  justify-content: center
  gap: $space-medium
  list-style-type: none
  padding: 0
  margin: 0
</style>
