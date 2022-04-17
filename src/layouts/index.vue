<template>
  <el-container class="w-screen h-screen">
    <el-aside :class="getCollapsed ? 'el-menu--collapse' : ''">
      <cho-sidebar />
    </el-aside>
    <el-container>
      <el-header>
        <cho-header />
      </el-header>
      <el-main>
        <cho-content />
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import ChoSidebar from "/@/layouts/siderbar/index.vue";
import ChoHeader from "/@/layouts/header/index.vue";
import ChoContent from "/@/layouts/page/index.vue";

import { useMenuSetting } from "/@/hooks/setting/useMenuSetting";

const { getCollapsed } = useMenuSetting();
</script>
