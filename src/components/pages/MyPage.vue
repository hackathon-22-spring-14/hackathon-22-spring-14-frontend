<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { defineComponent } from 'vue'
import Card from '../molecules/StampCard.vue'

export default defineComponent({
  name: 'MyPage',
  components: {
    Card,
  },
  setup() {
    return {
      nums: [1, 2, 3],
    }
  },
})
</script>

<template>
  <div class="cards">
    <!-- A card with given width -->
    <!--スタンプの数だけv-for-->
    <div v-for="(num, index) in nums" :key="index">
      <Card
        :num="num"
        :image="'https://q.trap.jp/api/v3/public/icon/inu_warabi'"
        :name="'スタンプ' + num"
      ></Card>
    </div>

    <!-- Repeat other cards -->
  </div>
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
