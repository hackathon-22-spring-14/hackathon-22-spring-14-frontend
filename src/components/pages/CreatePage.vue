<template>
<div id="stamp" class="stamp">
  <div style="width:fit-content;">
    <div class="upload">
    <input v-model="title" placeholder="スタンプの名前を入力" class="stamp-title"/>
    <div class="upload-section">
      <button @click="createStamp">投稿</button>
    </div>
    </div>
    <div class="preview">
      <CanvasPreview />
    </div>
  </div>
</div>
  <div class="setting-box">
    <div class="setting-text">
      <div class="box-top"></div>
      <p class="box-title">テキスト</p>
      <div class="items">
        <p class="items-title">テキストを入力</p>
        <textarea v-model="text" class="main-textarea"></textarea>
      </div>
      <div class="items">
        <p class="items-title">フォント</p>
        <PulldownSelect
        :options="['san-serif', 'fantasy']"
        placeholder="Fontselect"
        class="pulldown-select"
        @selected="picked = $event"
        />
      </div>
      <div class="items">
        <p class="items-title">文字の色</p>
        <div style="display: flex">
          <div :style="{'background-color': `rgb(${colors[0]},${colors[1]},${colors[2]})`}" class="color-preview"></div>
          <div>
            <input v-model="colors[0]" type="range" min="0" max="255" class="input-range"/>Red :
            {{ colors[0] }}
            <br />
            <input v-model="colors[1]" type="range" min="0" max="255" class="input-range"/>Green :
            {{ colors[1] }}
            <br />
            <input v-model="colors[2]" type="range" min="0" max="255" class="input-range"/>Blue :
            {{ colors[2] }}
          </div>
        </div>
        
      </div>
      
    </div>

    <div class="setting-background">
      <div class="box-top"></div>
      <p class="box-title">背景</p>
      <div style="display: flex; flex-wrap:wrap;">
        <img
         v-for="(imgInfo, key) in imgInfos"
         :id="imgInfo.id"
         :key="key"
         :src="imgInfo.src"
         @click="imgId = `${imgInfo.id}`"
         style="width: 30%; height: 30%; margin: 5px; box-shadow: var(--standardShadow);"
       />
      </div>
      
       <InputFile v-model:imgInfosProp="imgInfos"/>
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
      imgId: 'img_null',
       imgInfos: [
         { src: '../../../img/null.png', id: 'img_null' },
         { src: '../../../img/shuchu.png', id: 'shuchu.png' },
         { src: '../../../img/red_shuchu.png', id: 'img_red_shuchu' },
       ],
       imgUploadedIndex: 0,
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
      () => this.colors[0],
      () => this.rewrite(ctx, canvas.width, canvas.height)
    )

    watch(
      () => this.colors[1],
      () => this.rewrite(ctx, canvas.width, canvas.height)
    )

    watch(
      () => this.colors[2],
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

       const img = document.getElementById(this.imgId)

       if (img) {
         ctx.drawImage(img, 0, 0, w, h)
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

<style scoped>

html {
  padding: 0;;
}
/**アップロード部分とプレビュー部分 */
.stamp {
  display: flex;
  width: auto;
  margin: 0px 0px 10px 0px;
  padding: 0px auto;
  background-color: white;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 5;
  box-shadow: var(--standardShadow);
}
.upload {
  display: flex;
  width: 272px;
  justify-content: center;
  margin: 5px;
}
.stamp-title {
  border-bottom: 1px solid black;
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
  width: fit-content;
  margin: 5px;
}
/**編集ボックス共通の部分 */
.setting-box {
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
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
.items {
  background-color: rgb(210, 210, 210);
  margin: 5px;
  padding: 3px;
}

.items-title {
  padding-left: 5px;
  background-color: whitesmoke;
  border-bottom: 1px solid black;
  margin-bottom: 5px;
}
/* テキスト編集ボックス */
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
.input-range{
  margin-left: 5px;
}
.color-preview {
  height: 50px;
  width: 50px;
  border: 2px solid #c7c7c7;
  padding: 3px;
  margin: 5px;
}
/* 背景編集ボックス */
.setting-background {
  background-color: whitesmoke;
  width: 300px;
  margin: 10px;
  box-shadow: var(--standardShadow);
}
/** エフェクト編集ボックス */
.setting-effects {
  background-color: whitesmoke;
  width: 300px;
  margin: 10px;
  box-shadow: var(--standardShadow);
}


</style>
