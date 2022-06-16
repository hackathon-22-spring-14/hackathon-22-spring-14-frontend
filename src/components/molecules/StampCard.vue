<template>
  <div id="stampCard" class="card">
    <!-- Cover -->
    <div class="card-cover">
      <!--仮のテキストを置いています-->
      <!--<div class="stamp_name">{{info.name}}</div>-->
      <p class="card-title">No.{{ num }} : StampName</p>
      <!--テストのために仮の画像を置いています-->
      <img class="card-image" src="../../assets/IMG_1122.JPG" />
      <!--<img src="data:image/png;base64,{{ info.image }}" />-->
    </div>

    <!-- Content -->
    <div class="card-content">updated: {{ info }}</div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'StampCard',
  props: {
    num: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      info: [],
      error: [],
    }
  },
  mounted() {
    axios
      /** .get('サーバーのURL(?)') */
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then((response) => (this.info = response.data.time.updated))
      .catch((e) => (this.error = e))
  },
}
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
