import { cloneDeep, uniqueId } from "lodash-es";
import { ROW_KEY } from "./../const";
import { computed, ComputedRef, ref, Ref, unref } from "vue";
import type { PaginationProps } from "../types/pagination";
import type { BasicTableProps } from "../types/table";

interface ActionType {
  getPaginationInfo: ComputedRef<boolean | PaginationProps>;
  setPagination: (info: Partial<PaginationProps>) => void;
  setLoading: (loading: boolean) => void;
  //   getFieldsValue: () => Recordable;
  //   clearSelectedRowKeys: () => void;
  tableData: Ref<Recordable[]>;
}

export function useDataSource(
  propsRef: ComputedRef<BasicTableProps>,
  {
    getPaginationInfo,
    setPagination,
    setLoading,
    // getFieldsValue,
    // clearSelectedRowKeys,
    tableData,
  }: ActionType,
  emit: EmitType
) {
  const dataSourceRef = ref<Recordable[]>([]);
  const rawDataSourceRef = ref<Recordable[]>([]);

  const getAutoCreateKey = computed(() => {
    return unref(propsRef).autoCreateKey && !unref(propsRef).rowKey;
  });

  const getDataSourceRef = computed(() => {
    const dataSource = unref(dataSourceRef);

    if (!dataSource || dataSource.length === 0) {
      return unref(dataSourceRef);
    }

    if (unref(getAutoCreateKey)) {
      const firstItem = dataSource[0];
      const lastItem = dataSource[dataSource.length - 1];

      if (firstItem && lastItem) {
        if (!firstItem[ROW_KEY] || !lastItem[ROW_KEY]) {
          const data = cloneDeep(unref(dataSourceRef));
          data.forEach((item) => {
            if (!item[ROW_KEY]) {
              item[ROW_KEY] = uniqueId;
            }
            if (item.children && item.children.length) {
              setTableKey(item.children);
            }
          });
          dataSourceRef.value = data;
        }
      }
    }

    return unref(dataSourceRef);
  });

  function setTableKey(items: any[]) {
    if (!items || !Array.isArray(items)) {
      return;
    }

    items.forEach((item) => {
      if (!item[ROW_KEY]) {
        item[ROW_KEY] = uniqueId;
      }
      if (item.children && item.children.length) {
        setTableKey(item.children);
      }
    });
  }

  return {
    getDataSourceRef,
  };
}
