import { createRouter, createWebHistory } from 'vue-router'
import Create from './components/pages/CreatePage.vue'
import Gallery from './components/pages/GalleryPage.vue'
import Mypage from './components/pages/MyPage.vue'

const routes = [
  { path: '/', name: 'createPage', component: Create },

  { path: '/gallery', name: 'galleryPage', component: Gallery },

  { path: '/mypage', name: 'myPage', component: Mypage },
]

const router = createRouter({
  history: createWebHistory(), // HTML5 History モード
  routes,
})

export default router
