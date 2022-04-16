import { RouteRecordRaw } from "vue-router";
import { LAYOUT } from "/@/router/constant";

const system: RouteRecordRaw = {
  path: "/system",
  name: "System",
  component: LAYOUT,
  // redirect:""
  meta: {
    title: "系统管理",
  },
  children: [
    {
      path: "/account",
      name: "Account",
      component: () => import("/@/views/system/account.vue"),
      meta: {
        title: "用户管理",
      },
    },
    {
      path: "/role",
      name: "Role",
      component: () => import("/@/views/system/role.vue"),
      meta: {
        title: "权限管理",
      },
    },
    {
      path: "/menu",
      name: "Menu",
      component: () => import("/@/views/system/menu.vue"),
      meta: {
        title: "菜单管理",
      },
    },
  ],
};

export default system;
