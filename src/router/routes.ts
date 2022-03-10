import type { AppRouteRecordRaw } from "./types";

const routes: AppRouteRecordRaw[] = [
  {
    path: "/home",
    name: "home",
    component: () => import("/@/views/home/Home.vue"),
    meta: {
      title: "主页",
    },
  },
  {
    path: "/",
    name: "login",
    component: () => import("/@/views/login/Login.vue"),
    meta: {
      title: "登录",
    },
  },
];

export default routes;
