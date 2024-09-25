
import { createRouter, createWebHistory } from "vue-router";
import PostCreate from "@/components/qnaComponents/PostCreate.vue";
import PostEdit from "@/components/qnaComponents/PostEdit.vue";
import HomeView from "@/views/HomeView.vue";
import QnAView from "@/views/QnAView.vue";
import EducationView from "@/views/EducationView.vue";
import CommunityList from "@/components/communityComponents/CommunityList.vue";
import CommunityCreate from "@/components/communityComponents/CommunityCreate.vue";
import CommunityDetail from "@/components/communityComponents/CommunityDetail.vue";
import CommunityEdit from "@/components/communityComponents/CommunityEdit.vue";
import ProgramView from "@/views/ProgramView.vue";
import ParkView from "@/views/ParkView.vue";
import ParkDetailView from "@/views/ParkDetailView.vue";
import Login from "@/components/loginComponents/Login.vue";
import Register from "@/components/loginComponents/Register.vue";
import EduView from "@/views/EduView.vue";
import EduDetailView from "@/views/EduDetailView.vue";
import ProgramList from "@/components/programComponents/ProgramList.vue";
import ServiceInfo from "@/components/ServiceInfo.vue";
import QnApostView from "@/views/QnApostView.vue";
import FilteredCommunityList from "@/components/communityComponents/FilteredCommunityList.vue";
import MyPage from "@/components/MyPage.vue";
import WeatherWidget from "@/components/weatherComponents/WeatherWidget.vue";


const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {

    path: '/weather-Widget',
    name: 'WeatherWidget',
    component: WeatherWidget, 

  },

  {
    path: "/serviceInfo",
    name: "커넥티움?",
    component: ServiceInfo,
  },
  {
    path: "/postList",
    name: "PostList",
    component: QnAView,
  },
  {
    path: "/post/create",
    name: "PostCreate",
    component: PostCreate,
  },
  {
    path: "/post/:id",
    name: "PostView",
    component: QnApostView,
  },
  {
    path: "/post/:id/edit",
    name: "PostEdit",
    component: PostEdit,
  },
  {
    path: "/educationProgram",
    name: "교육프로그램",
    component: EducationView,
  },
  {
    path: "/program/:type/:svcid",
    name: "programDetail",
    component: ProgramView,
  },
  {
    path: "/program/all",
    name: "programList",
    component: ProgramList,
  },
  {
    path: "/community",
    name: "우리아이커뮤니티",
    component: CommunityList,
  },
  {
    path: "/community/filtered/:category",
    name: "FilteredCommunity",
    component: FilteredCommunityList,
    props: true
  },
  {
    path: "/community/create",
    name: "CommunityCreate",
    component: CommunityCreate,
  },
  {
    path: "/community/:id",
    name: "CommunityDetail",
    component: CommunityDetail,
  },
  {
    path: "/community/edit/:id",
    name: "CommunityEdit",
    component: CommunityEdit,
  },
  {
    path: "/outdoor/park",
    name: "신나는 우리동네",
    component: ParkView,
  },
  {
    path: "/outdoor/park/:id",
    name: "ParkDetail",
    component: ParkDetailView,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/Education",
    name: "jun",
    component: EduView,
  },
  {
    path: "/Education/:id",
    name: "junDetail",
    component: EduDetailView,
  },
  {
    path: "/mypage",
    name: "mypage",
    component: MyPage,
  },
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
