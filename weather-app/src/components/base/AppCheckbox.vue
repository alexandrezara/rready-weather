<template>
  <div class="app-checkbox">
    <input id="checkbox" type="checkbox" v-model="checked" />
    <label @click="toggleCheckbox">{{ text }}</label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppIcon",
  props: {
    modelValue: Boolean,
    text: {
      type: String,
      required: true,
    },
  },
  data: function() {
    return {
      checked: this.modelValue,
    };
  },
  watch: {
    checked(value: boolean, _: any) {
      this.$emit("update:modelValue", value);
    },
  },
  methods: {
    toggleCheckbox() {
      this.checked = !this.checked;
    },
  },
});
</script>

<style scoped lang="sass">
.app-checkbox
  display: flex
  gap: $space-small
  margin: 4px 0

  input
    width: 18px
    height: 18px
    cursor: pointer

  label
    cursor: pointer
</style>
