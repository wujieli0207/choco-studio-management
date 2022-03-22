<template>
  <!-- TODO 侧边栏内容动态配置 -->
  <a-layout-sider v-model:collapsed="collapsed" collapsible :trigger="null">
    <a-menu theme="dark" mode="inline" :onClick="handleMenuClick">
      <template v-for="item in sideBarItem" :key="item.index">
        <!-- 支持一级菜单栏 -->
        <template v-if="!item.subs">
          <a-menu-item :key="item.index">
            <template #icon> <component :is="item.icon" /> </template>
            {{ item.title }}
          </a-menu-item>
        </template>
        <!-- 支持二级菜单栏 -->
        <template v-if="item.subs">
          <a-sub-menu :key="item.index">
            <template #title> {{ item.title }} </template>
            <template #icon> <component :is="item.icon" /> </template>
            <template v-for="subItem in item.subs" :key="subItem.index">
              <template v-if="!subItem.subs">
                <a-menu-item :key="subItem.index">
                  <template #icon> <component :is="subItem.icon" /> </template>
                  {{ subItem.title }}
                </a-menu-item>
              </template>
              <!-- 支持三级菜单 -->
              <template v-if="subItem.subs">
                <a-sub-menu>
                  <template #title> {{ subItem.title }} </template>
                  <template #icon> <component :is="subItem.icon" /> </template>
                  <template v-for="threeItem in subItem.subs">
                    <a-menu-item v-if="!threeItem.subs" :key="threeItem.index">
                      <template #icon> <component :is="threeItem.icon" /> </template>
                      {{ threeItem.title }}
                    </a-menu-item>
                  </template>
                </a-sub-menu>
              </template>
            </template>
          </a-sub-menu>
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts" setup>
  import { useAppStore } from "/@/store/modules/app";
  import { useGo } from "/@/hooks/web/usePage";
  import { SideBarItem } from "./types";

  const appStore = useAppStore();
  const go = useGo();

  const collapsed: boolean = appStore.getSidebarCollapsed();

  const sideBarItem: SideBarItem[] = [
    {
      index: "/home",
      title: "系统首页",
      icon: "home-outlined",
    },
    {
      index: "2",
      title: "预约管理",
      icon: "clock-circle-outlined",
      subs: [
        {
          index: "/appointManage",
          title: "预约内容管理",
        },
        {
          index: "/appointView",
          title: "预约视图查看",
        },
      ],
    },
    {
      index: "3",
      title: "文章模块",
      icon: "edit-outlined",
      subs: [
        {
          index: "/articleManage",
          title: "文章管理",
        },
        {
          index: "/articleEdit",
          title: "文章编辑",
        },
      ],
    },
    {
      index: "4",
      title: "系统管理",
      icon: "desktop-outlined",
      subs: [
        {
          index: "/userManage",
          title: "用户管理",
        },
        {
          index: "/roleManage",
          title: "权限管理",
        },
        {
          index: "/menuManage",
          title: "菜单管理",
        },
      ],
    },
  ];

  /**
   * @description 点击左侧菜单跳转页面
   */
  function handleMenuClick({ key }: { key: string }) {
    go(key);
  }
</script>
