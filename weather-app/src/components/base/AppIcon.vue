<template>
  <div v-bind="$attrs" class="app-icon" :class="classes" :style="style">
    <img :src="requiredSource" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppIcon",
  props: {
    src: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 42,
    },
    clicable: {
      type: Boolean,
      default: false,
    },
  },
  data: function() {
    return {};
  },
  computed: {
    requiredSource() {
      return require(`@/assets/${this.src}`).default;
    },
    classes() {
      return {
        clicable: this.clicable,
      };
    },
    style() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
        borderRadius: `${this.size}px`,
      };
    },
  },
});
</script>

<style scoped lang="sass">
.app-icon
  display: flex
  justify-content: center
  align-items: center
  padding: 8px
  background-color: white
  cursor: inherit
  user-select: none

  &.clicable
    cursor: pointer

    &:hover
      background-color: $color-purple-light

  img
    display: inline-block
    pointer-events: none
    user-select: none
    width: 100%
    height: 100%
    object-fit: contain
</style>
