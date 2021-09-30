<template>
  <div class="home">
    <app-search />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppSearch from "@/components/AppSearch.vue";

export default defineComponent({
  name: "Home",
  components: {
    AppSearch,
  },
});
</script>
