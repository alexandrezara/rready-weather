<template>
  <div
    class="app-draggable-card"
    :class="{ over: over, active: active }"
    @dragEnter="dragEnter"
    @dragover="dragOver"
    @dragleave="dragLeave"
    @drop="dragDrop"
  >
    <div
      class="drag-content"
      :class="{ dragging: dragging }"
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
    id: String,
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
      event?.dataTransfer?.setData("text/plain", `${this.id}`);
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
        to: this.id,
      });
    },
  },
});
</script>

<style scoped lang="sass">
.app-draggable-card.active
  border: 1px solid #f0f0f0
  width: 250px
  height: 350px

  &.over
    border: 1px solid red

  .drag-content
    background-color: #fff0f0
    width: 100%
    height: 90%
    cursor: move

    &.dragging
      background-color: #e0ffe0

  .hide
    display: none
</style>
