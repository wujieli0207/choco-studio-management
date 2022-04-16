import { RouteRecordRaw } from "vue-router";
import { LAYOUT } from "/@/router/constant";

const article: RouteRecordRaw = {
  path: "/article",
  name: "Article",
  component: LAYOUT,
  // redirect:""
  meta: {
    title: "文章模块",
  },
  children: [
    {
      path: "/articleManage",
      name: "ArticleManage",
      component: () => import("/@/views/article/articleManage.vue"),
      meta: {
        title: "文章管理",
      },
    },
    {
      path: "/articleEdit",
      name: "ArticleEdit",
      component: () => import("/@/views/article/articleEdit.vue"),
      meta: {
        title: "文章编辑",
      },
    },
  ],
};

export default article;
