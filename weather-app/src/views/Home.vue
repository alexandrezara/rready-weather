<template>
  <div class="home">
    <button @click="toggleEdit">Edit: {{ editing }}</button>
    <ul class="city-list">
      <li v-for="city in cityList">
        <app-draggable-card
          :id="city"
          :active="editing"
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
  data: function() {
    return {
      editing: false,
    };
  },
  computed: {
    cityList() {
      return this.$store.state.cities;
    },
  },
  methods: {
    moveCards(data: any) {
      this.$store.commit("moveCity", data);
    },
    toggleEdit() {
      this.editing = !this.editing;
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
