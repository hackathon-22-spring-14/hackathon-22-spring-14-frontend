import { createRouter,createWebHistory } from 'vue-router';
import Create from "./components/pages/createPage.vue";
import Gallery from "./components/pages/galleryPage.vue";
import Mypage from "./components/pages/myPage.vue";
 
const routes = [
    { path: '/', 
      name: 'createPage', 
      component: Create },

    { path: '/gallery', 
      name: 'galleryPage', 
      component: Gallery },

    { path: '/mypage', 
      name: 'myPage', 
      component: Mypage },
]
 
const router = createRouter({
    history: createWebHistory(), // HTML5 History モード
    routes,
})
 
export default router;