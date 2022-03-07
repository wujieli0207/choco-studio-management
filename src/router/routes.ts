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
];

export default routes;
