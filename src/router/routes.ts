import type { AppRouteRecordRaw } from "./types";

const routes: AppRouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("/@/views/home/Home.vue"),
    meta: {
      title: "主页",
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("/@/views/login/Login.vue"),
    meta: {
      title: "登录",
    },
  },
];

export default routes;
