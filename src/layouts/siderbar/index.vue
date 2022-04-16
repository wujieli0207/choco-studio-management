<template>
  <!-- 管理后台名称 -->
  <!-- TODO tailwind leading-12 无效 -->
  <div
    class="h-12 text-xl font-semibold text-center text-white bg-slate-900"
    style="line-height: 3rem"
  >
    <div v-if="!getCollapsed">{{ title }}</div>
  </div>
  <!-- TODO 侧边栏暂时不是动态生成的 -->
  <el-menu class="h-screen" :router="true" :collapse="getCollapsed">
    <el-menu-item index="/home">
      <el-icon><home-filled /></el-icon>
      <template #title>
        <span>首页</span>
      </template>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><picture-filled /></el-icon>
        <span>课程管理</span>
      </template>
      <el-menu-item index="/courseManage">
        <template #title> 课程内容管理 </template>
      </el-menu-item>
      <el-menu-item index="/courseView">
        <template #title> 课程视图查看 </template>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon><platform /></el-icon>
        <span>文章模块</span>
      </template>
      <el-menu-item index="/articleManage">
        <template #title> 文章管理 </template>
      </el-menu-item>
      <el-menu-item index="/articleEdit">
        <template #title> 文章编辑 </template>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>
        <el-icon><avatar /></el-icon>
        <span>系统管理</span>
      </template>
      <el-menu-item index="account">
        <template #title> 用户管理 </template>
      </el-menu-item>
      <el-menu-item index="role">
        <template #title> 权限管理 </template>
      </el-menu-item>
      <el-menu-item index="menu">
        <template #title> 菜单管理 </template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import {
  HomeFilled,
  Avatar,
  Platform,
  PictureFilled,
} from "@element-plus/icons-vue";
import { useMenuSetting } from "/@/hooks/setting/useMenuSetting";

const { getCollapsed } = useMenuSetting();

const title = import.meta.env.VITE_GLOB_APP_TITLE;
</script>
