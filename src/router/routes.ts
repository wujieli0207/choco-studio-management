import type { AppRouteRecordRaw } from "./types";

const routes: AppRouteRecordRaw[] = [
  {
    path: "/layout",
    name: "layout",
    // component: () => import("/@/views/home/Home.vue"),
    component: () => import("/@/layouts/Layouts.vue"),
    meta: {
      title: "主页",
    },
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          title: "系统首页",
        },
        component: () => import("/@/views/home/Home.vue"),
      },
      {
        path: "/appointManage",
        name: "appointManage",
        meta: {
          title: "预约内容管理",
        },
        component: () => import("/@/views/appoint/AppointManage.vue"),
      },
      {
        path: "/appointView",
        name: "appointView",
        meta: {
          title: "预约视图查看",
        },
        component: () => import("/@/views/appoint/AppointView.vue"),
      },
    ],
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
