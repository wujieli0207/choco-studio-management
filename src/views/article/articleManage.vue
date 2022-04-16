<template>
  <el-card>
    <el-tabs v-model="activeName">
      <el-tab-pane label="文章列表" name="allArticle">allArticle</el-tab-pane>
      <el-tab-pane label="草稿箱" name="draft">draft</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const activeName = ref("allArticle");
</script>
