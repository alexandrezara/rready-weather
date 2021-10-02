<template>
  <div class="app-config">
    <button
      class="config-button"
      :class="{ configuring: configuring }"
      @click="toggleConfig"
    ></button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppConfig",
  emits: ["config"],
  data: function() {
    return {
      configuring: false,
    };
  },
  methods: {
    toggleConfig() {
      this.configuring = !this.configuring;
      this.$emit("config", this.configuring);
    },
  },
});
</script>

<style scoped lang="sass">
.app-config
  position: absolute
  top: 8px
  right: 8px
  width: 30px
  height: 30px
  background-color: red

  &.configuring
    top: 0
    right: 0
    width: 100%
    height: 100%
    background-color: rgba(255, 0, 0, 0.3)

  .config-button
    width: 18px
    height: 18px
    background-color: blue
    border: 0
    margin: 0
    padding: 0
    cursor: pointer
</style>
