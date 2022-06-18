<template>
<div class="stamp">
  <div class="upload">
    <input v-model="title" placeholder="スタンプの名前を入力" class="stamp-title"/>
    <div class="upload-section">
      <button @click="createStamp">Upload</button>
    </div>
  </div>
  <div class="preview">
      <CanvasPreview />
  </div>
</div>
  <div class="setting-box">
    <div class="setting-text">
      <div class="box-top"></div>
      <p class="box-title">テキスト</p>
      <textarea v-model="text" class="main-textarea"></textarea>
      <div id="v-model-radiobutton" class="font-select">
        <!--<input v-model="picked" type="radio" value="san-serif" />
        <label for="san-serif">san-serif</label>
        <br />
        <input v-model="picked" type="radio" value="fantasy" />
        <label for="fantasy">fantasy</label>-->
        <PulldownSelect
        :options="['san-serif', 'fantasy']"
        placeholder="Fontselect"
        class="pulldown-select"
        @selected="picked = $event"
      />
      </div>
      <input v-model="colors[0]" type="range" min="0" max="255" class="input-range"/>Red
      {{ colors[0] }}
      <br />
      <input v-model="colors[1]" type="range" min="0" max="255" class="input-range"/>Green
      {{ colors[1] }}
      <br />
      <input v-model="colors[2]" type="range" min="0" max="255" class="input-range"/>Blue
      {{ colors[2] }}
    </div>

    <div class="setting-background">
      <div class="box-top"></div>
      <p class="box-title">背景</p>
      <InputFile />
    </div>

    <div class="setting-effects">
      <div class="box-top"></div>
      <p class="box-title">エフェクト</p>
    </div>

    
  </div>
    
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import { api } from '../../utils/api'
import CanvasPreview from '../atomics/CanvasPreview.vue'
import InputFile from '../atomics/InputFile.vue'
import PulldownSelect from '../atomics/PulldownSelect.vue'

export default defineComponent({
  components: {
    CanvasPreview,
    InputFile,
    PulldownSelect
  },
  data() {
    return {
      text: 'うし',
      picked: 'fantasy',
      colors: [0, 0, 0],
      title: '',
    }
  },
  mounted() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    const [red, green, blue] = this.colors
    ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`
    ctx.strokeRect(0, 0, canvas.width, canvas.height)
    this.rewrite(ctx, canvas.width, canvas.height)

    watch(
      () => this.text,
      () => this.rewrite(ctx, canvas.width, canvas.height)
    )

    watch(
      () => this.picked,
      () => this.rewrite(ctx, canvas.width, canvas.height)
    )

    watch(
      () => this.colors,
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

      // 描画
      const [red, green, blue] = this.colors
      ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`
      ctx.font = `bold ${w}px ${this.picked}`
      ctx.textBaseline = 'top'

      const lines = this.text.replace(/\r/g, '').split('\n')

      for (let i = 0; i < lines.length; i++) {
        // 横幅から倍率を決定
        const textWidth = ctx.measureText(lines[i]).width
        if (textWidth === 0) {
          continue
        }
        const ratio = w / textWidth

        ctx.scale(ratio, 1 / lines.length)
        ctx.fillText(lines[i], 0, w * i)
        ctx.scale(1 / ratio, lines.length)
      }
    },
    // TODO: pagesに移動させる
    createStamp() {
      const canvas = document.getElementById('canvas') as HTMLCanvasElement
      const imageUrl = canvas.toDataURL('image/png')
      try {
        api.createStamp(this.title, imageUrl)
      } catch (e) {
        console.error(e)
      }
    },
  },
})
</script>

<style scoped>

html {
  padding: 0;;
}
.stamp {
  width: 300px;
  margin: 30px 0px 30px 0px;
  padding: 0px auto;
  justify-content: center;
}
.upload {
  display: flex;
  width: 320px;
  justify-content: center;
  margin: 5px;
}
.stamp-title {
  border-bottom: 2px solid black;
  margin: 3px;
}
.upload-section {
  display: flex;
  padding: 2px 7px;
  width: fit-content;
  height: fit-content;
  background-color: var(--secondry);
  color: var(--textOnSecondry);
  border-radius: 5px;
  align-items: center;
  box-shadow: var(--buttonShadow);
  transition: var(--buttonTransition);
}
.upload-section:hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
.preview {
  background-color: whitesmoke;
  display: flex;
  width: 320px;
}
.setting-box {
  flex-wrap: wrap;
  display: flex;
  width: fit-content;
}
.box-top {
  padding: 3px;
  background-color: var(--primaryDark);
}
.box-title {
  background-color: var(--primary);
  color: var(--textOnPrimary);
  padding: 5px;
}
.setting-text {
  background-color: whitesmoke;
  width: 300px;
  margin: 10px;
  box-shadow: var(--standardShadow);
}
.main-textarea {
  margin: 5px;
  border: 2px solid rgb(230, 230, 230);
}
.font-select {
  width: fit-content;
}
.pulldown-select {
  margin: 5px;
  background-color: white;
}
.setting-background {
  background-color: whitesmoke;
  width: 300px;
  margin: 10px;
  box-shadow: var(--standardShadow);
}
.setting-effects {
  background-color: whitesmoke;
  width: 300px;
  margin: 10px;
  box-shadow: var(--standardShadow);
}


</style>
