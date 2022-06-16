<template>
  <MasterHeader />
  <router-view />
  <MasterFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MasterFooter from './organisms/MasterFooter.vue'
import MasterHeader from './organisms/MasterHeader.vue'

export default defineComponent({
  name: 'App',
  components: {
    MasterHeader,
    MasterFooter,
  },
})
</script>

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

footer {
  position: absolute;
  bottom: 0;
}
</style>
