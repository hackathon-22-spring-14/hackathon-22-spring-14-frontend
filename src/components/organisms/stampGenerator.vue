<script>
import { ref, VueElement } from 'vue'

export default {
  data() {
    return {
      text: 'うし',
      picked: 'fantasy',
      colors: [0, 0, 0],
    }
  },
  watch: {
    text: function () {
      this.rewrite()
    },
    picked: function () {
      this.rewrite()
    },
  },
  mounted() {
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.ctx.strokeStyle =
      'rgb(' +
      this.colors[0] +
      ',' +
      this.colors[1] +
      ',' +
      this.colors[2] +
      ')'
    this.ctx.strokeRect(10, 10, 100, 100)
  },
  methods: {
    rewrite() {
      // 全体をクリア
      this.ctx.clearRect(0, 0, 400, 400)
      if (this.text === '') {
        return
      }
      // 横幅を取得
      const text_width = this.ctx.measureText(this.text).width
      // 横幅に合わせて、横方向の倍率を調整
      this.ctx.scale(1, 1)
      // 描画
      this.ctx.font = 'bold 48px ' + this.picked
      this.ctx.strokeStyle =
        'rgb(' +
        this.colors[0] +
        ',' +
        this.colors[1] +
        ',' +
        this.colors[2] +
        ')'
      this.ctx.fillText(this.text, 0, 48)
      // this.ctx.strokeStyle = "rgb("+color_red+","+color_green+","+color_blue+")";
      // this.ctx.strokeText(text,0,0)
    },
    save_png() {
      // TODO
    },
    save_gif() {
      // TODO
    },
  },
}
</script>

<script setup>
import File from '../atomics/inputFile.vue'
</script>

<template>
  <div class="preview">
    <canvas id="canvas" width="300" height="300" class="main-canvas"></canvas
    ><br />
  </div>

  <div class="setting-box">
    <div class="setting-text">
      <p class="box-title">TEXT</p>
      <textarea v-model="text" class="main-textarea"></textarea>
      <div id="v-model-radiobutton">
        <input v-model="picked" type="radio" value="san-serif" />
        <label for="san-serif">san-serif</label>
        <br />
        <input v-model="picked" type="radio" value="fantasy" />
        <label for="fantasy">fantasy</label>
      </div>
    </div>

    <div class="setting-background">
      <p class="box-title">BACKGROUND</p>
      <File class="input-file"></File>
    </div>
    
    <div class="setting-effects">
      <p class="box-title">EFFECTS</p>
    </div>
  </div>
</template>

<style scoped>
#canvas {
  border: 1px solid black;
  background-color: white;
  margin: 10px;
}
.preview {
  background-color: whitesmoke;
  display: flex;
  width: 320px;
  justify-content: center;
}
.setting-box {
  display: flex;
  justify-content: center;
}
.box-title {
  background-color: whitesmoke;
  padding: 5px;
}
.setting-text {
  background-color: rgb(200, 200, 200);
  flex-basis: 30%;
  margin: 5px;
}
.main-textarea {
  margin: 5px;
  border: 2px solid black;
}
.setting-background {
  background-color: rgb(150, 150, 150);
  flex-basis: 30%;
  margin: 5px;
}
.setting-effects {
  background-color: rgb(100, 100, 100);
  flex-basis: 30%;
  margin: 5px;
}
</style>
