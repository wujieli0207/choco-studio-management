<template>
  <mark-down
    ref="markDownRef"
    v-model:value="markdownValue"
    @change="handleChange"
    placeholder="请输入 Markdown 文本"
  />
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
