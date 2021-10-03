<template>
  <div
    class="app-draggable-card drag-container"
    :class="{ over: over, active: enableDrag }"
    @dragEnter="dragEnter"
    @dragover="dragOver"
    @dragleave="dragLeave"
    @drop="dragDrop"
  >
    <div
      class="drag-content"
      :class="{ dragging: dragging, active: enableDrag }"
      :draggable="enableDrag"
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
    enableDrag: Boolean,
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
  border: 2px solid transparent
  border-radius: $size-border-radius

  &.active
    border: 2px dashed $color-purple-light

  &.over
    border: 2px solid darken($color-purple-light, 10%)

.drag-content
  border-radius: $size-border-radius

  &.active
    cursor: move

  &.dragging
    background-color: white

  .hide
    display: none
</style>
