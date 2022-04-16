<template>
  <!-- TODO 目前单元格不可编辑，可编辑单元格待后续完成 -->
  <span>{{ getTitle }}</span>
  <!-- TODO 列提示内容待实现 -->
</template>

<script lang="ts" setup>
  import { computed, PropType } from "vue";
  import { BasicColumn } from "../types/table";

  const props = defineProps({
    column: {
      type: Object as PropType<BasicColumn>,
      default: () => ({}),
    },
  });

  const getTitle = computed(() => props.column?.customTitle);
</script>
