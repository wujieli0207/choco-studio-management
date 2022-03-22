import { BasicColumn } from "./../types/table";
import { onUnmounted, ref, toRaw, unref, watch, WatchStopHandle } from "vue";
import { PaginationProps } from "../types/pagination";
import type { BasicTableProps, FetchParams, TableActionType } from "../types/table";
import { DynamicProps } from "/#/utils";
import { FormActionType } from "/@/components/ChoForm/types.ts/form";
import { getDynamicProps } from "/@/utils";
import { isProdMode } from "/@/utils/env";
import { error } from "/@/utils/log";

type Props = Partial<DynamicProps<BasicTableProps>>;

type UseTableMethod = TableActionType & {
  getForm: () => FormActionType;
};

export function useTable(tableProps?: Props) {
  const tableRef = ref<Nullable<TableActionType>>(null);
  const loadedRef = ref<Nullable<boolean>>(false);
  const formRef = ref<Nullable<UseTableMethod>>(null);

  let stopWatch: WatchStopHandle;

  function register(instance: TableActionType, formInstance: UseTableMethod) {
    isProdMode() &&
      onUnmounted(() => {
        tableRef.value = null;
        loadedRef.value = null;
      });

    if (unref(loadedRef) && isProdMode() && instance === unref(tableRef)) {
      return;
    }

    tableRef.value = instance;
    formRef.value = formInstance;
    tableProps && instance.setProps(getDynamicProps(tableProps));
    loadedRef.value = true;

    stopWatch = watch(
      () => tableProps,
      () => {
        tableProps && instance.setProps(getDynamicProps(tableProps));
      },
      {
        immediate: true,
        deep: true,
      }
    );

    stopWatch?.();
  }

  function getTableInstance(): TableActionType {
    const table = unref(tableRef);
    if (!table) {
      error(
        "The table instance has not been obtained yet, please make sure the table is presented when performing the table operation!"
      );
    }
    return table as TableActionType;
  }

  const methods: TableActionType & {
    getForm: () => FormActionType;
  } = {
    reload: async (opt?: FetchParams) => {
      return await getTableInstance().reload(opt);
    },
    getSelectedRows: () => {
      return toRaw(getTableInstance().getSelectedRows());
    },
    getSelectedRowKeys: () => {
      return toRaw(getTableInstance().getSelectedRowKeys());
    },
    getDataSource: () => {
      return getTableInstance().getDataSource();
    },
    getRawDataSource: () => {
      return getTableInstance().getRawDataSource();
    },
    getColumns: ({ ignoreIndex = false }: { ignoreIndex?: boolean } = {}) => {
      const columns = getTableInstance().getColumns({ ignoreIndex }) || [];
      return toRaw(columns);
    },
    getPaginationRef: () => {
      return getTableInstance().getPaginationRef();
    },
    getSize: () => {
      return toRaw(getTableInstance().getSize());
    },
    getRowSelection: () => {
      return toRaw(getTableInstance().getRowSelection());
    },
    getCacheColumns: () => {
      return toRaw(getTableInstance().getCacheColumns());
    },
    getShowPagination: () => {
      return toRaw(getTableInstance().getShowPagination());
    },
    setTableData: (values: unknown[]) => {
      return getTableInstance().setTableData(values);
    },
    setPagination: (info: Partial<PaginationProps>) => {
      return getTableInstance().setPagination(info);
    },
    setColumns: (columns: BasicColumn[] | string[]) => {
      getTableInstance().setColumns(columns);
    },
    setLoading: (loading: boolean) => {
      getTableInstance().setLoading(loading);
    },
    setProps: (props: Partial<BasicTableProps>) => {
      getTableInstance().setProps(props);
    },
    setSelectedRowKeys: (keys: string[] | number[]) => {
      getTableInstance().setSelectedRowKeys(keys);
    },
    setShowPagination: async (show: boolean) => {
      getTableInstance().setShowPagination(show);
    },
    findTableDataRecord: (rowKey: string | number) => {
      return getTableInstance().findTableDataRecord(rowKey);
    },
    updateTableDataRecord: (rowKey: string | number, record: Recordable) => {
      return getTableInstance().updateTableDataRecord(rowKey, record);
    },
    insertTableDataRecord: (record: Recordable | Recordable[], index?: number) => {
      return getTableInstance().insertTableDataRecord(record, index);
    },
    deleteTableDataRecord: (rowKey: string | number | string[] | number[]) => {
      return getTableInstance().deleteTableDataRecord(rowKey);
    },
    updateTableData: (index: number, key: string, value: unknown) => {
      return getTableInstance().updateTableData(index, key, value);
    },
    clearSelectedRowKeys: () => {
      getTableInstance().clearSelectedRowKeys();
    },
    deleteSelectRowByKey: (key: string) => {
      getTableInstance().deleteSelectRowByKey(key);
    },
    redoHeight: () => {
      getTableInstance().redoHeight();
    },
    expandAll: () => {
      getTableInstance().expandAll();
    },
    expandRows: (keys: string[]) => {
      getTableInstance().expandRows(keys);
    },
    collapseAll: () => {
      getTableInstance().collapseAll();
    },
    scrollTo: (pos: string) => {
      getTableInstance().scrollTo(pos);
    },
    getForm: () => {
      return unref(formRef) as unknown as FormActionType;
    },
  };

  return [register, methods];
}
