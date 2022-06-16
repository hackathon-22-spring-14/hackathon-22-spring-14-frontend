<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import StampGenerator from '../organisms/StampGenerator.vue'
</script>

<template>
  <StampGenerator></StampGenerator>
</template>

<style>
:root {
  /* 色についての設定 */
  --headerColor: ;
  --headerShadowColor: rgba(0, 0, 0, 0.2);
  /* テキストについての設定 */
  --fontSizeTitle: 28px;
  --fontSizeXLarge: 18px;
  --fontSizeLarge: 16px;
  --fontSizeMedium: 14px;
  --fontSizeSmallIcon: 16px;
  --fontSizeIcon: 26px;
  --fontSizePart: 48px;
  --multilineTextLineHeight: 1.5;
}

html {
  padding: 0;
}
</style>
