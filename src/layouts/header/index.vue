<template>
  <div class="flex items-center justify-between h-12 bg-slate-900">
    <div class="flex flex-row ml-4">
      <el-button type="primary">
        <el-icon><d-arrow-left /></el-icon>
        <el-icon><d-arrow-right /></el-icon>
      </el-button>
    </div>
    <!-- 右侧下拉菜单 -->
    <div class="mr-12">
      <el-dropdown>
        <div class="flex items-center">
          <el-avatar :src="avatar" />
          <span class="ml-4 text-sm text-white">wujieli</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <a href="javascript:;">帮助文档</a>
            </el-dropdown-item>
            <el-dropdown-item>
              <a href="javascript:;">个人中心</a>
            </el-dropdown-item>
            <el-divider style="margin: 0" />
            <el-dropdown-item>
              <a href="javascript:;">退出登录</a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DArrowLeft, DArrowRight } from "@element-plus/icons-vue";
import avatar from "/@/assets/image/avatar.jpg";

const title = import.meta.env.VITE_GLOB_APP_TITLE;
</script>
