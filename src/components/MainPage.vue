<script>
// import { ref, VueElement } from 'vue'

export default {
  data() {
    return {
      text: 'うし',
      text2: 'うし',
      picked: 'fantasy',
      colors: [0, 0, 0],
    }
  },
  watch: {
    text: function () {
      this.update()
    },
    picked: function () {
      this.update()
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
    update() {
      this.ctx.clearRect(0, 0, 400, 400)
      // 環境により改行文字が違うので、修正
      const text_n = this.text.replace(/\r\n|\r/g, '\n')
      const lines = text_n.split('\n')
      for (let i = 0; i < lines.length; i++) {
        this.rewrite(lines[i], i, lines.length)
      }
    },
    rewrite(line, index, n) {
      if (line === '') {
        return
      }

      // 横幅を取得
      const text_width = this.ctx.measureText(line).width
      const offset = 400 / text_width
      this.text2 = offset
      // 横幅に合わせて、横方向の倍率を調整

      // 描画
      this.ctx.font = 'bold 400px ' + this.picked
      this.ctx.strokeStyle =
        'rgb(' +
        this.colors[0] +
        ',' +
        this.colors[1] +
        ',' +
        this.colors[2] +
        ')'
      this.ctx.textBaseline = 'top'

      // ある倍率で描画
      this.ctx.save()
      this.ctx.scale(offset, 1 / n)

      this.ctx.fillText(line, 0, 400 * index)

      this.ctx.restore()
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
  <div>{{ text2 }}</div>
</template>

<style scoped>
#canvas {
  border: 1px solid black;
}
</style>
