<template>
  <a-card>
    <div>
      <a-input />
    </div>
    <div>
      <a-table :columns="columns" :data-source="data"></a-table>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
  import useAppointManage from "./hooks/useAppointManage";

  const { columns, data } = useAppointManage();
</script>
