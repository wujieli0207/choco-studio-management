<template>
  <el-card>
    <el-tabs v-model="activeName">
      <el-tab-pane label="文章列表" name="allArticle">
        <div>
          <template v-for="item in articleList" :key="item.articleId">
            <el-descriptions>
              <template #title>
                <a href="#" class="hover:text-blue-400">
                  {{ item.articleTitle }}
                </a>
              </template>
              <!-- 右上角弹出框 -->
              <template #extra>
                <el-dropdown placement="bottom-end" size="small">
                  <!-- <span> ... </span> -->
                  <el-button size="small" style="border: none">...</el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>编辑</el-dropdown-item>
                      <el-dropdown-item divided>
                        <span class="text-red-600">下架</span>
                      </el-dropdown-item>
                      <el-dropdown-item
                        ><span class="text-red-600"
                          >删除</span
                        ></el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </template>

              <el-descriptions-item label="发布时间:">
                {{ item.createTime }}
              </el-descriptions-item>
              <el-descriptions-item label="类别:">
                <template v-for="c in item.catagory">
                  <el-tag class="ml-2" type="success"> {{ c }} </el-tag>
                </template>
              </el-descriptions-item>
              <el-descriptions-item label="标签:">
                <template v-for="t in item.tag">
                  <el-tag class="ml-2"> {{ t }} </el-tag>
                </template>
              </el-descriptions-item>
            </el-descriptions>
            <el-divider style="margin: 0 0 20px 0" />
          </template>
        </div>
      </el-tab-pane>
      <el-tab-pane label="草稿箱" name="draft">draft</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script lang="ts" setup>
import { onMounted, Ref, ref } from "vue";
import { getArticleListApi } from "/@/api/article";
import { ArticleList } from "/@/api/model/articleModel";

const activeName = ref("allArticle");

const articleList: Ref<ArticleList[]> = ref([]);

onMounted(async () => {
  articleList.value = await getArticleListApi();
});
</script>
