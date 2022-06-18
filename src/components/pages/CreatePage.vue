<template>
  <input v-model="title" placeholder="スタンプの名前を入力" />
  <div class="preview">
    <CanvasPreview />
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
      <input v-model="colors[0]" type="range" min="0" max="255" />Red
      {{ colors[0] }}
      <br />
      <input v-model="colors[1]" type="range" min="0" max="255" />Green
      {{ colors[1] }}
      <br />
      <input v-model="colors[2]" type="range" min="0" max="255" />Blue
      {{ colors[2] }}
    </div>

    <div class="setting-background">
      <p class="box-title">BACKGROUND</p>
      <img
        v-for="(imgInfo, key) in imgInfos"
        :id="imgInfo.id"
        :src="imgInfo.src"
        @click="imgId = `${imgInfo.id}`"
        :key="key"
      />
      <InputFile />
    </div>

    <div class="setting-effects">
      <p class="box-title">EFFECTS</p>
    </div>

    <div class="upload-section">
      <button @click="createStamp">Upload</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import { api } from '../../utils/api'
import CanvasPreview from '../atomics/CanvasPreview.vue'
import InputFile from '../atomics/InputFile.vue'

export default defineComponent({
  components: {
    CanvasPreview,
    InputFile,
  },
  data() {
    return {
      text: 'うし',
      picked: 'fantasy',
      colors: [0, 0, 0],
      title: '',
      imgId: 'img_null',
      imgInfos: [
        { src: '../../../img/null.png', id: 'img_null' },
        { src: '../../../img/shuchu.png', id: 'shuchu.png' },
        { src: '../../../img/red_shuchu.png', id: 'img_red_shuchu' },
      ],
      img_uploaded_index: 0,
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

    watch(
      () => this.imgId,
      () => this.rewrite(ctx, canvas.width, canvas.height)
    )
  },
  methods: {
    rewrite(ctx: CanvasRenderingContext2D, w: number, h: number) {
      // 全体をクリア
      ctx.clearRect(0, 0, w, h)

      const img_element = document.getElementById(this.imgId)

      if (img_element) {
        // const img_allpath_src = "../../../img/" + img_element.src
        ctx.drawImage(img_element, 0, 0)
      }

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

.upload-section {
  display: flex;
}
</style>
