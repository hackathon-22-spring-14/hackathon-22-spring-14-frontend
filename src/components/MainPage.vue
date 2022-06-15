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

<template>
  <canvas id="canvas" width="400" height="400"></canvas><br />
  <textarea v-model="text"></textarea>
  <div id="v-model-radiobutton">
    <input v-model="picked" type="radio" value="san-serif" />
    <label for="san-serif">san-serif</label>
    <br />
    <input v-model="picked" type="radio" value="fantasy" />
    <label for="fantasy">fantasy</label>
  </div>
  <div>{{ text }}</div>
</template>

<style scoped>
#canvas {
  border: 1px solid black;
}
</style>
