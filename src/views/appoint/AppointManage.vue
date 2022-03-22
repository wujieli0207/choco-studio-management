<template>
  <a-card>
    <div>
      <a-input />
    </div>
    <div>
      <!-- <a-table :columns="columns" :data-source="data"></a-table> -->
      <basic-table>
        <template #img="{ text }">
          <table-img :size="60" :simple-show="true" :image="text" />
        </template>
      </basic-table>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
  import { BasicTable } from "/@/components/ChoTable";
  import useAppointManage from "./hooks/useAppointManage";
  import TableImg from "/@/components/ChoTable/src/components/TableImg.vue";
  import { useTable } from "/@/components/ChoTable/src/hooks/useTable";

  const { columns, data } = useAppointManage();

  const [registerTable] = useTable({
    title: "可预约内容管理",
    titleHelpMessage: ["暂无提示"],
    columns: columns,
    showIndexColumn: true,
    showTableSetting: true,
    tableSetting: { fullScreen: true },
    actionColumn: {
      width: 160,
      title: "操作",
      dataIndex: "action",
      slots: { customRender: "action" },
    },
  });
</script>
