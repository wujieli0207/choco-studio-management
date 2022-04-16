<template>
  <el-card>
    <el-row :gutter="24">
      <el-col :span="6">
        <el-input placeholder="请输入标题..." />
      </el-col>
      <el-col :span="6">
        <el-button type="primary">提交</el-button>
      </el-col>
    </el-row>
    <div class="mt-4">
      <mark-down
        ref="markDownRef"
        v-model:value="markdownValue"
        @change="handleChange"
        placeholder="请输入 Markdown 文本"
      />
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { MarkDown } from "/@/components/Markdown";

const markDownRef = ref(null);
const markdownValue = ref("");

function handleChange(value: string) {
  markdownValue.value = value;
  console.log("markdownValue.value: ", markdownValue.value);
}
</script>
