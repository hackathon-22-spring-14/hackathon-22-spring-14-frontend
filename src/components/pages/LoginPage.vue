<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import axios from 'axios'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MyPage',
  data() {
    return {
      username: '',
      password: '',
      result: '結果がここに返ります'
    }
  },
  methods: {
    login() {
      axios.post('/api/users/login', {
        username: this.username,
        password: this.password,
      }).then(response => (this.result = response.data))
    },
    signup() {
      axios.post('/api/users/signup', {
        username: this.username,
        password: this.password,
      }).then(response => (this.result = response.data))
    },
  },
})
</script>

<template>
  ログインしてください
  <input v-model="username" type="text" />
  <input v-model="password" type="password" />
  <button @click="login">ログインする</button>
  <button @click="signup">登録する</button>
  <br/>{{ result }}
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
</style>
