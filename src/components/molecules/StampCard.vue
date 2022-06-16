<template>
  <div id="stampCard" class="card">
    <!-- Cover -->
    <div class="card-cover">
      <p class="card-title">No.{{ num.toString() }} : {{ name }}</p>
      <!--テストのために仮の画像を置いています-->
      <img class="card-image" :src="image" />
      <!--<img src="data:image/png;base64,{{ info.image }}" />-->
    </div>

    <!-- Content -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StampCard',
  props: {
    num: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
})
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  margin: 10px;
}
.card-title {
  padding: 5px;
  background-color: whitesmoke;
}

.card-cover {
  height: 205px;
  width: 170px;
  background-color: #6b818e;
}

.card-content {
  width: 170px;
  /* Take available height */
  flex: 1;
  background-color: azure;
}

.card-image {
  flex: 1;
  padding: 5px;
}
</style>
