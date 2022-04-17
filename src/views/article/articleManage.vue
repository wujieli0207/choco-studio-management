<template>
  <el-card>
    <el-tabs v-model="activeName">
      <el-tab-pane label="文章列表" name="allArticle">
        <article-list-component :list="articleList" />
      </el-tab-pane>
      <el-tab-pane label="草稿箱" name="draft">draft</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script lang="ts" setup>
import { onMounted, Ref, ref } from "vue";
import { getArticleListApi } from "/@/api/article";
import { ArticleList } from "/@/api/model/articleModel";
import ArticleListComponent from "./components/articleList.vue";

const activeName = ref("allArticle");

const articleList: Ref<ArticleList[]> = ref([]);

onMounted(async () => {
  articleList.value = await getArticleListApi();
});
</script>
