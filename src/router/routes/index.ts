import { RouteRecordRaw } from "vue-router";

const modules = import.meta.globEager("./modules/**/*.ts");
console.log("modules: ", modules);

const routeModuleList: RouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

// TODO 404 页面暂时没有加入
export const asyncRoutes = [...routeModuleList];

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
  component: () => import("/@/layouts/index.vue"),
  meta: {
    title: "主页",
  },
  children: [
    {
      path: "/home",
      name: "home",
      component: () => import("/@/views/home/index.vue"),
      meta: {
        title: "home",
      },
    },
  ],
};

export const basicRoutes = [LoginRoute, HomeRoute, ...asyncRoutes];
