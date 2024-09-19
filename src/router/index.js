import { createRouter, createWebHistory } from 'vue-router';
import PostCreate from '@/components/qnaComponents/PostCreate.vue';
import PostEdit from '@/components/qnaComponents/PostEdit.vue';
import PostView from '@/components/qnaComponents/PostView.vue';
import HomeView from '@/views/HomeView.vue';
import QnAView from '@/views/QnAView.vue';
import EducationView from '@/views/EducationView.vue';
import CommunityList from '@/components/communityComponents/CommunityList.vue';
import CommunityCreate from '@/components/communityComponents/CommunityCreate.vue';
import CommunityDetail from '@/components/communityComponents/CommunityDetail.vue';
import CommunityEdit from '@/components/communityComponents/CommunityEdit.vue';
import ProgramView from '@/views/ProgramView.vue';
import ParkView from '@/views/ParkView.vue';
import ParkDetailView from '@/views/ParkDetailView.vue';
import Login from '@/components/loginComponents/Login.vue';
import Register from '@/components/loginComponents/Register.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView, 
  },
  {
    path: '/postList',
    name: 'PostList',
    component: QnAView, 
  },
  {
    path: '/post/create',
    name: 'PostCreate',
    component: PostCreate,
  },
  {
    path: '/post/:id',
    name: 'PostView',
    component: PostView,
  },
  {
    path: '/post/:id/edit',
    name: 'PostEdit',
    component: PostEdit,
  },
  {
    path: '/educationProgram',
    name: '교육프로그램',
    component: EducationView,
  },
  {
    path: '/program/:type/:svcid',
    name: 'programDetail',
    component: ProgramView
  },
  {
    path: '/community',
    name: '우리아이커뮤니티',
    component: CommunityList
  },

  {
    path: '/community/create',
    name: 'CommunityCreate',
    component: CommunityCreate
  },
  {
    path: '/community/:id',
    name: 'CommunityDetail',
    component: CommunityDetail
  },
  {
    path: '/community/edit/:id',
    name: 'CommunityEdit',
    component: CommunityEdit
  },
  {
    path: '/outdoor/park',
    name: '신나는 우리동네',
    component: ParkView
  },
  {
    path: '/outdoor/park/:id',
    name: 'ParkDetail',
    component: ParkDetailView
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 네비게이션 가드
// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('token');

//   if (authRequired && !loggedIn) {
//     return next('/login');
//   }

//   next();
// });

export default router;