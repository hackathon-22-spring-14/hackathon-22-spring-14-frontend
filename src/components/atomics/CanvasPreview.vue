<template>
  <canvas id="canvas" width="300" height="300" class="main-canvas"></canvas>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CanvasPreview',
})
</script>

<style>
#canvas {
  border: 1px solid black;
  background-color: white;
  margin: 10px;
}
</style>
