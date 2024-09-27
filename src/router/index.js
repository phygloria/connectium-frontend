
import { createRouter, createWebHistory } from "vue-router";
import PostCreate from "@/components/qnaComponents/PostCreate.vue";
import PostEdit from "@/components/qnaComponents/PostEdit.vue";
import PostView from "@/components/qnaComponents/PostView.vue";
import HomeView from "@/views/HomeView.vue";
import QnAView from "@/views/QnAView.vue";
import ProgramListView from "@/views/ProgramListView.vue";
import CommunityList from "@/components/communityComponents/CommunityList.vue";
import CommunityCreate from "@/components/communityComponents/CommunityCreate.vue";
import CommunityDetail from "@/components/communityComponents/CommunityDetail.vue";
import CommunityEdit from "@/components/communityComponents/CommunityEdit.vue";
import ParkView from "@/views/ParkView.vue";
import ParkDetail from "@/components/outdoorComponents/ParkDetail.vue";
import Login from "@/components/loginComponents/Login.vue";
import Register from "@/components/loginComponents/Register.vue";
import EduView from "@/views/EduView.vue";
import EducationDetail from "@/components/educationComponents/EducationDetail.vue";
import ProgramList from "@/components/programComponents/ProgramList.vue";
import FilteredCommunityList from "@/components/communityComponents/FilteredCommunityList.vue";
import MyPage from "@/components/MyPage.vue";
import WeatherWidget from "@/components/weatherComponents/WeatherWidget.vue";
import ProgramDetail from "@/components/programComponents/ProgramDetail.vue";


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
    component: PostView,
  },
  {
    path: "/post/:id/edit",
    name: "PostEdit",
    component: PostEdit,
  },
  {
    path: "/program",
    name: "프로그램",
    component: ProgramListView,
  },
  {
    path: "/program/:type/:svcid",
    name: "programDetail",
    component: ProgramDetail,
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
    props: true,
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
    component: ParkDetail,
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
    path: "/education",
    name: "jun",
    component: EduView,
  },
  {
    path: "/education/:id",
    name: "junDetail",
    component: EducationDetail,
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
