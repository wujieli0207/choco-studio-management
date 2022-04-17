<template>
  <div>
    <template v-for="item in list" :key="item.articleId">
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
                  ><span class="text-red-600">删除</span></el-dropdown-item
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

  <!-- 分页 -->
  <el-pagination
    class="float-right"
    :page-size="10"
    :pager-count="5"
    layout="prev, pager, next"
    :total="100"
  />
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { ArticleList } from "/@/api/model/articleModel";

const props = defineProps({
  list: {
    type: Array as PropType<ArticleList[]>,
    default: () => {},
  },
});
</script>
