<template>
  <!-- TODO 侧边栏不是动态生成的 -->
  <el-menu :router="true">
    <el-menu-item index="/home">
      <template #title>
        <el-icon><home-filled /></el-icon>
        首页
      </template>
    </el-menu-item>
    <el-sub-menu index="1">
      <template #title>
        <el-icon><picture-filled /></el-icon>
        课程管理
      </template>
      <el-menu-item>
        <template #title> 课程内容管理 </template>
      </el-menu-item>
      <el-menu-item>
        <template #title> 课程视图查看 </template>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><platform /></el-icon>
        文章模块
      </template>
      <el-menu-item>
        <template #title> 文章管理 </template>
      </el-menu-item>
      <el-menu-item>
        <template #title> 文章编辑 </template>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon><avatar /></el-icon>
        系统管理
      </template>
      <el-menu-item>
        <template #title> 用户管理 </template>
      </el-menu-item>
      <el-menu-item>
        <template #title> 权限管理 </template>
      </el-menu-item>
      <el-menu-item>
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
</script>
