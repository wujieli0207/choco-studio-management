import componentSettion from "/@/settings/componentSettion";

const { table } = componentSettion;

const {
  defaultPageSize,
  defaultSize,
  fetchSetting,
  pageSizeOptions,
  defaultSortFn,
  defaultFilterFn,
} = table;

export const ROW_KEY = "key";

export const DEFAULT_ALIGN = "center"; // 表格内容位置，默认居中

export const INDEX_COLUMN_FLAG = "INDEX"; // 默认索引列标志

export const ACTION_COLUMN_FLAG = "ACTION"; // 默认操作列标志

export const FETCH_SETTING = fetchSetting;

export const PAGE_SIZE = defaultPageSize;

export const DEFAULT_SIZE = defaultSize;

export const PAGE_SIZE_OPTIONS = pageSizeOptions;

export const DEFAULT_SORT_FN = defaultSortFn;

export const DEFAULT_FILTER_FN = defaultFilterFn;
