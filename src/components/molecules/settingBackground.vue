<script setup lang="ts">
import File from '../atomics/inputFile.vue'
</script>

<template>
  <div class="space">
    <p class="space-title">BACKGROUND</p>
    <File class="input-file"></File>
  </div>
  
</template>

<style scoped>
.space {
  background-color: rgb(150, 150, 150);
  flex-basis: 30%;
  margin: 5px;
}
.space-title {
    padding: 5px;
    background-color: rgb(220, 220, 220);
}
.input-file {
    margin: 5px;
}
</style>
