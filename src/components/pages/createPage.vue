<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Header from '../organisms/masterHeader.vue'
import Footer from '../organisms/masterFooter.vue'
import SettingText from '../molecules/settingText.vue'
import SettingBackground from '../molecules/settingBackground.vue'
import SettingEffects from '../molecules/settingEffects.vue'
</script>

<template>
  <Header></Header>
  <div class="setting-box">
    <SettingText></SettingText>
    <SettingBackground></SettingBackground>
    <SettingEffects></SettingEffects>
  </div>
  <Footer></Footer>
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

.setting-box {
  display: flex;
  justify-content: center;
}
</style>
