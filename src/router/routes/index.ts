import { RouteRecordRaw } from "vue-router";

export const LoginRoute: RouteRecordRaw = {
  path: "/login",
  name: "Login",
  component: () => import("/@/views/login/Login.vue"),
  meta: {
    title: "登录",
  },
};

export const HomeRoute: RouteRecordRaw = {
  path: "/layout",
  name: "layout",
  component: () => import("../../layouts/index.vue"),
  meta: {
    title: "主页",
  },
  children: [
    {
      path: "/home",
      name: "home",
      component: () => import("/@/views/Home.vue"),
      meta: {
        title: "home",
      },
    },
  ],
};

export const basicRoutes = [LoginRoute, HomeRoute];
