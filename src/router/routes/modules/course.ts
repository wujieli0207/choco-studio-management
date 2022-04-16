import { RouteRecordRaw } from "vue-router";
import { LAYOUT } from "/@/router/constant";

const course: RouteRecordRaw = {
  path: "/course",
  name: "Course",
  component: LAYOUT,
  // redirect:""
  meta: {
    title: "课程管理",
  },
  children: [
    {
      path: "/courseManage",
      name: "CourseManage",
      component: () => import("/@/views/course/courseManage.vue"),
      meta: {
        title: "课程内容管理",
      },
    },
    {
      path: "/courseView",
      name: "CourseView",
      component: () => import("/@/views/course/courseView.vue"),
      meta: {
        title: "课程视图查看",
      },
    },
  ],
};

export default course;
