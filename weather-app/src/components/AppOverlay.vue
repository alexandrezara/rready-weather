<template>
  <div class="app-overlay" v-if="active">
    <div class="loader"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppOverlay",
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped lang="sass">
$size: 36px

.app-overlay
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  display: flex
  justify-content: center
  align-items: center
  background-color: white

  .loader
    border: 1px solid darken(white, 8%)
    border-top: 2px solid $color-purple
    border-radius: $size
    width: $size
    height: $size
    animation: spin 1s linear infinite

    @keyframes spin
      0%
        transform: rotate(0deg)

      100%
        transform: rotate(360deg)
</style>
