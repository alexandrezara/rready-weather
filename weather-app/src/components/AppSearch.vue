<template>
  <div class="app-search">
    <input type="text" v-model="searchString" />
    <button type="button">Search</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppSearch",
  data: function() {
    return {
      searchString: "",
    };
  },
});
</script>

<style scoped lang="sass"></style>
