import { RouteRecordRaw } from "vue-router";

export const LoginRoute: RouteRecordRaw = {
  path: "/login",
  name: "Login",
  component: () => import("/@/views/login/Login.vue"),
  meta: {
    title: "登录",
  },
};

export const basicRoutes = [LoginRoute];
