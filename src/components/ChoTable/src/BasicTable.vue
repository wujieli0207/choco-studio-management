<template>
  <a-table ref="tableRef" v-show="getEmptyDataIsShowTable">
    <!-- 渲染 data -->
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}" />
    </template>

    <!-- 渲染 column -->
    <template v-for="(column, index) in getViewColumns" :key="index">
      <header-cell #[`header-${column.dataIndex}`] :column="column" />
    </template>
  </a-table>
</template>

<script lang="ts" setup>
  import { computed, ref, unref } from "vue";
  import HeaderCell from "./components/HeaderCell.vue";
  import { useColumns } from "./hooks/useColumns";
  import { usePagination } from "./hooks/usePagination";
  import { useDataSource } from "./hooks/useDataSource";
  import { useLoading } from "./hooks/useLoading";
  import type { BasicTableProps, TableActionType } from "./types/table";

  const props = defineProps({});
  const emits = defineEmits();

  const tableRef = ref(null);
  const tableData = ref<Recordable[]>([]);

  const innerPropsRef = ref<Partial<BasicTableProps>>();

  const getProps = computed(() => {
    return { ...props, ...unref(innerPropsRef) } as BasicTableProps;
  });

  const { getLoading, setLoading } = useLoading(getProps);

  const { getPaginationInfo, getPagination, setPagination, getShowPagination, setShowPagination } =
    usePagination(getProps);

  const { getDataSourceRef } = useDataSource(
    getProps,
    {
      getPaginationInfo,
      setPagination,
      setLoading,
      tableData,
    }
    ...emits
  );

  const getEmptyDataIsShowTable = computed(() => {
    const { emptyDataIsShowTable, useSearchForm } = unref(getProps);
    if (emptyDataIsShowTable || !useSearchForm) {
      return true;
    }
    return !!unref(getDataSourceRef).length;
  });

  const { getViewColumns } = useColumns(getProps, getPaginationInfo);

  // const tableAction: TableActionType = {
  //   reload,
  //   getSelectedRows,
  //   getSelectedRowKeys,
  //   getDataSource,
  //   getRawDataSource,
  //   getColumns,
  //   getPaginationRef,
  //   // getSize: () => {
  //   //   return unref(getBind);
  //   // },
  //   getRowSelection,
  //   getCacheColumns,
  //   getShowPagination,
  //   setTableData,
  //   setPagination,
  //   setColumns,
  //   setLoading,
  //   setProps,
  //   setSelectedRowKeys,
  //   setShowPagination,
  //   setCacheColumnsByField,
  //   findTableDataRecord,
  //   updateTableDataRecord,
  //   insertTableDataRecord,
  //   deleteTableDataRecord,
  //   updateTableData,
  //   clearSelectedRowKeys,
  //   deleteSelectRowByKey,
  //   redoHeight,
  //   expandAll,
  //   expandRows,
  //   collapseAll,
  //   scrollTo,
  //   emit,
  // };

  // emits("register", tableAction);
</script>
