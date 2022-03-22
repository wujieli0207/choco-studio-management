import { VueNode } from "ant-design-vue/lib/_util/type";
import { cloneDeep } from "lodash-es";
import type { BasicColumn, CellFormat, GetColumnsParams } from "../types/table";
import { computed, ComputedRef, Ref, ref, toRaw, unref, watch } from "vue";
import { PaginationProps } from "../types/pagination";
import { BasicTableProps } from "../types/table";
import { ACTION_COLUMN_FLAG, DEFAULT_ALIGN, INDEX_COLUMN_FLAG } from "../const";
import { isBoolean, isFunction, isNumber, isString } from "/@/utils/is";
import { formatToDate } from "/@/utils/dateUtil";

export function useColumns(
  propsRef: ComputedRef<BasicTableProps>,
  getPaginationRef: ComputedRef<boolean | PaginationProps>
) {
  const ColumnsRef = ref(unref(propsRef).columns) as unknown as Ref<BasicColumn[]>;
  let cacheColumns = unref(propsRef).columns;

  watch(
    () => unref(propsRef).columns,
    (columns) => {
      ColumnsRef.value = columns;
      cacheColumns = columns?.filter((item) => !item.flag) ?? [];
    }
  );

  const getColumnsRef = computed(() => {
    const columns = cloneDeep(unref(ColumnsRef));

    handleIndexColumn(propsRef, getPaginationRef, columns);
    handleActionColumn(propsRef, columns);

    if (!columns) {
      return [];
    }

    const { ellipsis } = unref(propsRef);
    columns.forEach((item) => {
      const { customRender, slots } = item;
      handleItem(
        item,
        Reflect.has(item, "ellipsis") ? !!item.ellipsis : !!ellipsis && !customRender && !slots
      );
    });
    return columns;
  });

  const getViewColumns = computed(() => {
    const viewColumns = sortFixedColumn(unref(getColumnsRef));

    const columns = cloneDeep(viewColumns);
    // TODO 列权限待开发
    return columns.map((column) => {
      const { slots, dataIndex, customRender, format, flag } = column;

      if (!slots || !slots?.title) {
        column.slots = { title: `header-${dataIndex}`, ...(slots || {}) };
        column.customTitle = column.title as unknown as VueNode;
        Reflect.deleteProperty(column, "title");
      }

      const isDefaultAction = [INDEX_COLUMN_FLAG, ACTION_COLUMN_FLAG].includes(flag!);
      if (!customRender && format && !isDefaultAction) {
        column.customRender = ({ text, record, index }) => {
          return formatCell(text, format, record as Recordable, index);
        };
      }

      // TODO 可编辑表处理待开发

      return column;
    });
  });

  function getColumns(opt?: GetColumnsParams) {
    const { ignoreIndex, ignoreAction, sort } = opt || {};
    let columns = toRaw(unref(getColumnsRef));

    if (ignoreIndex) {
      columns = columns.filter((item) => item.flag !== INDEX_COLUMN_FLAG);
    }
    if (ignoreAction) {
      columns = columns.filter((item) => item.flag !== ACTION_COLUMN_FLAG);
    }
    if (sort) {
      columns = sortFixedColumn(columns);
    }

    return columns;
  }

  return {
    getColumnsRef,
    getViewColumns,
    getColumns,
  };
}

function sortFixedColumn(columns: BasicColumn[]) {
  const fixedLeftColumns: BasicColumn[] = [];
  const fixedRightColumns: BasicColumn[] = [];
  const defColumns: BasicColumn[] = [];

  for (const column of columns) {
    if (column.fixed === "left") {
      fixedLeftColumns.push(column);
      continue;
    }
    if (column.fixed === "right") {
      fixedRightColumns.push(column);
      continue;
    }
    defColumns.push(column);
  }

  return [...fixedLeftColumns, ...defColumns, ...fixedRightColumns].filter(
    (item) => !item.defaultHidden
  );
}

function handleIndexColumn(
  _propsRef: ComputedRef<BasicTableProps>,
  _getPaginationRef: ComputedRef<boolean | PaginationProps>,
  _columns: BasicColumn[]
) {
  // TODO 处理表格列索引方法待实现
}

function handleActionColumn(propsRef: ComputedRef<BasicTableProps>, columns: BasicColumn[]) {
  // TODO 处理列操作方法待实现
}

function handleItem(item: BasicColumn, ellipsis: boolean) {
  const { key, dataIndex, children } = item;
  item.align = item.align || DEFAULT_ALIGN;

  if (ellipsis) {
    if (!key) {
      if (isString(dataIndex) || isNumber(dataIndex)) {
        item.key = dataIndex;
      }
    }
    if (!isBoolean(item.ellipsis)) {
      Object.assign(item, {
        ellipsis,
      });
    }
  }

  if (children && children.length) {
    handleChildren(children, !!ellipsis);
  }
}

function handleChildren(children: BasicColumn[] | undefined, ellipsis: boolean) {
  if (!children) {
    return;
  }

  children.forEach((item) => {
    const { children } = item;
    handleItem(item, ellipsis);
    handleChildren(children, ellipsis);
  });
}

function formatCell(text: string, format: CellFormat, record: Recordable, index: number) {
  if (!format) {
    return text;
  }

  // 自定义方法
  if (isFunction(format)) {
    return format(text, record, index);
  }

  try {
    // 日期格式化
    const DATE_FORMAT_PREFIX = "date|";
    if (isString(format) && format.startsWith(DATE_FORMAT_PREFIX)) {
      const dateFormat = format.replace(DATE_FORMAT_PREFIX, "");
      if (!dateFormat) {
        return text;
      }

      return formatToDate(new Date(text), dateFormat);
    }
  } catch (error) {
    return text;
  }
}
