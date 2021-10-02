<template>
  <div
    class="app-draggable-card drag-container"
    :class="{ over: over, active: active }"
    @dragEnter="dragEnter"
    @dragover="dragOver"
    @dragleave="dragLeave"
    @drop="dragDrop"
  >
    <div
      class="drag-content"
      :class="{ dragging: dragging, active: active }"
      :draggable="active"
      @dragstart="dragStart"
      @dragend="dragEnd"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppDraggableCard",
  emits: ["drag-and-drop"],
  props: {
    active: Boolean,
    index: Number,
  },
  data: function() {
    return {
      dragging: false,
      over: false,
    };
  },
  methods: {
    dragStart(event: DragEvent) {
      this.dragging = true;
      event?.dataTransfer?.setData("text/plain", `${this.index}`);
      setTimeout(() => {
        (<Element>event.target).classList.add("hide");
      }, 0);
    },
    dragEnd(event: DragEvent) {
      this.dragging = false;
    },
    dragEnter(event: DragEvent) {
      event.preventDefault();
      this.over = true;
    },
    dragOver(event: DragEvent) {
      event.preventDefault();
      this.over = true;
    },
    dragLeave(event: DragEvent) {
      event.preventDefault();
      this.over = false;
    },
    dragDrop(event: any) {
      event.preventDefault();
      this.over = false;
      this.dragging = false;
      const data = event.dataTransfer.getData("text/plain");
      this.$emit("drag-and-drop", {
        from: data,
        to: this.index,
      });
    },
  },
});
</script>

<style scoped lang="sass">
.app-draggable-card
  padding: 4px
  //background-color: red

.drag-container
  //background-color: lighten(grey, 45%)
  border: 2px solid lighten(grey, 45%)

  &.active
    border: 2px solid blue

  &.over
    border: 2px solid red

.drag-content
  //background-color: lighten(blue, 46%)

  &.active
    cursor: move

  &.dragging
    background-color: green

  .hide
    display: none
</style>
