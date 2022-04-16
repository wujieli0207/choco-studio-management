<template>
  <el-container class="w-screen h-screen">
    <el-aside width="200px">
      <cho-sidebar />
    </el-aside>
    <el-container>
      <cho-header />
      <el-main>
        <cho-content />
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import ChoSidebar from "/@/layouts/siderbar/index.vue";
import ChoHeader from "/@/layouts/header/index.vue";
import ChoContent from "/@/layouts/page/index.vue";
</script>
