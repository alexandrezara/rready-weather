<template>
  <div class="home">
    <ul class="widget-list">
      <li v-for="widget in widgets" :key="widget.cityName">
        <app-draggable-card
          :index="widget.order"
          :enableDrag="configuringMode"
          @drag-and-drop="updateWidgetOrder"
        >
          <app-weather-card
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
import AppDraggableCard from "@/components/base/AppDraggable.vue";
import AppWeatherCard from "@/components/AppWeatherCard.vue";
import { ICityWeather } from "@rready/weather-sdk";
import { Converter } from "@/model/Converters";
import { IWidget } from "@/model/IWidget";
import {
  IMutationWidgetReorder,
  IMutationWidgetUpdateWeather,
  IMutationWidgetUpdateWeatherFail,
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
      this.$store.commit("widgetUpdateWeatherReload", city);
      this.$api
        .weather(city)
        .then((response) => {
          if (!this.$store.state.networkOn) {
            throw "Network off for debugging";
          }
          this.successWeather(city, response);
        })
        .catch(() => {
          this.failWeather(city);
        });
    },
    successWeather(city: string, response: ICityWeather) {
      const weather = Converter.toIWeather(response);
      this.$store.commit("widgetUpdateWeather", {
        city: city,
        weather: weather,
      } as IMutationWidgetUpdateWeather);
    },
    failWeather(city: string) {
      this.$store.commit("widgetUpdateWeatherFail", {
        city: city,
      } as IMutationWidgetUpdateWeatherFail);
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
