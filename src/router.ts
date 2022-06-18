import { createRouter, createWebHistory } from 'vue-router'
import Create from './components/pages/CreatePage.vue'
import Gallery from './components/pages/GalleryPage.vue'
import Mypage from './components/pages/Mypage.vue'
import LoginPage from './components/pages/LoginPage.vue'

const routes = [
  { path: '/', name: 'createPage', component: Create },

  { path: '/gallery', name: 'galleryPage', component: Gallery },

  { path: '/mypage', name: 'myPage', component: Mypage },
  
  { path: '/login', name: 'LoginPage', component: LoginPage },
]

const router = createRouter({
  history: createWebHistory(), // HTML5 History モード
  routes,
})

export default router