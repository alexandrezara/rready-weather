<template>
  <div class="home">
    <ul class="city-list">
      <li v-for="city in cityList">
        <app-draggable-card
          :index="city.position"
          :active="editingMode"
          @drag-and-drop="moveCards"
        >
          <app-weather-card :city="city" />
        </app-draggable-card>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppWeatherCard from "@/components/AppWeatherCard.vue";
import AppDraggableCard from "@/components/AppDraggableCard.vue";

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
        return a.position - b.position;
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
          .weather(item.city)
          .then((data) => {
            this.$store.commit("updateWeather", {
              city: item.city,
              weather: data,
            });
          })
          .catch((error) => {
            alert(error);
          });
      });
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
