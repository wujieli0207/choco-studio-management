<template>
  <a-layout-header class="bg-slate-900">
    <div class="flex flex-row justify-between items-center">
      <!-- TODO 折叠侧边栏按钮样式待调整 -->
      <div class="flex flex-row">
        <a-button type="primary" @click="handleCollapse">
          <menu-unfold-outlined v-if="collapsed" class="text-xl" />
          <menu-fold-outlined v-else class="text-xl" />
        </a-button>
        <div class="ml-4 text-lg text-white font-semibold">{{ title }}</div>
      </div>

      <div class="flex flex-row justify-ends items-center">
        <!-- TODO 右侧消息中心 -->

        <!-- 右侧用户头像 -->
        <div class="mr-3">
          <a-avatar>
            <template #icon><user-outlined /></template
          ></a-avatar>
        </div>

        <!-- 右侧下拉菜单 -->
        <div class="mr-6">
          <a-dropdown>
            <a class="text-white flex items-center">
              wujieli
              <caret-down-outlined class="pl-1" />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;">帮助文档</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">个人中心</a>
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item>
                  <a href="javascript:;">退出登录</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
    </div>
  </a-layout-header>
</template>

<script lang="ts" setup>
  import {
    UserOutlined,
    CaretDownOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  } from "@ant-design/icons-vue";
  import { useAppStore } from "/@/store/modules/app";

  const appStore = useAppStore();

  const title = import.meta.env.VITE_GLOB_APP_TITLE;

  const collapsed = appStore.getSidebarCollapsed();

  function handleCollapse() {
    appStore.setSidebarCollapsed(!collapsed.value);
  }
</script>
