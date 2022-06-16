<script lang="ts">
import { defineComponent, watch } from 'vue'
import InputFile from '../atomics/InputFile.vue'

export default defineComponent({
  components: {
    InputFile,
  },
  data() {
    return {
      text: 'うし',
      picked: 'fantasy',
      colors: [0, 0, 0],
    }
  },
  mounted() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    const [red, green, blue] = this.colors
    ctx.strokeStyle = `rgb(${red}, ${green}, ${blue})`
    ctx.strokeRect(0, 0, canvas.width, canvas.height)

    watch(
      () => this.text,
      () => this.rewrite(ctx, canvas.width, canvas.height)
    )

    watch(
      () => this.picked,
      () => this.rewrite(ctx, canvas.width, canvas.height)
    )
  },
  methods: {
    rewrite(ctx: CanvasRenderingContext2D, w: number, h: number) {
      // 全体をクリア
      ctx.clearRect(0, 0, w, h)
      if (this.text === '') {
        return
      }
      // // 横幅を取得
      // const text_width = this.ctx.measureText(this.text).width
      // 横幅に合わせて、横方向の倍率を調整
      // ctx.scale(1, 1)
      // 描画
      const [red, green, blue] = this.colors
      ctx.strokeStyle = `rgb(${red}, ${green}, ${blue})`
      ctx.font = 'bold 48px ' + this.picked
      const lines = this.text.replace(/\r/g, '').split('\n')
      for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], 0, 48 * (i + 1))
      }
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
})
</script>

<template>
  <div class="preview">
    <canvas id="canvas" width="300" height="300" class="main-canvas"></canvas>
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
      <InputFile />
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
