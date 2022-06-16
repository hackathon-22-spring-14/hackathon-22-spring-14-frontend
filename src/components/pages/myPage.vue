<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Header from '../organisms/masterHeader.vue'
import Footer from '../organisms/masterFooter.vue'
import Card from '../molecules/stampCard.vue'
</script>

<template>
  <Header></Header>
  <div class="cards">
    <!-- A card with given width -->
    <!--スタンプの数だけv-for-->
    <div class="cards-item">
      <Card num="1"></Card>
    </div>
    <div class="cards-item">
      <Card num="2"></Card>
    </div>
    <div class="cards-item">
      <Card num="3"></Card>
    </div>

    <!-- Repeat other cards -->
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

.cards {
  display: flex;
  justify-content: center;

  /* Put a card in the next row when previous cards take all width */
  flex-wrap: wrap;

  margin-left: -8px;
  margin-right: -8px;
}

.cards-item {
  /* There will be 4 cards per row */
  flex-basis: 170px;
  padding: 10px;
}
</style>
