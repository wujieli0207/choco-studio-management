<template>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <page-layout />
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import PageLayout from "/@/layouts/page/index.vue";
</script>
