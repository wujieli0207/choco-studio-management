import { RoleEnum } from "/@/enums/roleEnum";
import type { PaginationProps } from "./pagination";
import type { ColumnProps } from "ant-design-vue/lib/table";
import { ColumnFilterItem, TableRowSelection } from "ant-design-vue/lib/table/interface";
import { VueNode } from "ant-design-vue/lib/_util/type";
import { VNodeChild } from "vue";
import { ComponentType } from "./ComponentType";

export type SortOrder = "ascend" | "descend";

export type CellFormat =
  | string
  | ((text: string, record: Recordable, index: number) => string | number)
  | Map<string | number, any>;

export interface GetColumnsParams {
  ignoreIndex?: boolean;
  ignoreAction?: boolean;
  sort?: boolean;
}

export interface FetchParams {
  searchInfo?: Recordable;
  Page?: number;
  sortInfo?: Recordable;
  filterInfo?: Recordable;
}

export interface GetColumnsParams {
  ignoreIndex?: boolean;
  ignoreAction?: boolean;
  sort?: boolean;
}

export type SizeType = "default" | "middle" | "small" | "large";

export interface BasicColumn extends ColumnProps {
  children?: BasicColumn[];
  filters?: ColumnFilterItem[];
  flag?: "INDEX" | "DEFAULT" | "CHECKBOX" | "RADIO" | "ACTION";
  customTitle?: VueNode;
  slots?: Recordable;
  defaultHidden?: boolean; // 是否默认隐藏列
  helpMessage?: string | string[]; // 列 header 的提示文字
  format?: CellFormat;

  // 可编辑表格相关类
  edit?: boolean;
  editRow?: boolean;
  editable?: boolean;
  editComponent?: ComponentType;
  editComponentProps?:
    | ((opt: {
        text: string | number | boolean | Recordable;
        record: Recordable;
        column: BasicColumn;
        index: number;
      }) => Recordable)
    | Recordable;
  editRule?: boolean | ((text: string, record: Recordable) => Promise<string>);
  editValueMap?: (value: unknown) => string;
  onEditRow?: () => void;
  auth?: RoleEnum | RoleEnum[] | string | string[];
  ifShow?: boolean | ((column: BasicColumn) => boolean);
  // 自定义修改后的内容
  editRender?: (opt: {
    text: string | number | boolean | Recordable;
    record: Recordable;
    column: BasicColumn;
    index: number;
  }) => VNodeChild | JSX.Element;
}

export interface TableSetting {
  redo?: boolean;
  size?: boolean;
  setting?: boolean;
  fullScreen?: boolean;
}

export interface BasicTableProps {
  columns: BasicColumn[]; // 列配置
  indexColumnProps?: BasicColumn; // 序号列配置
  rowKey?: string | ((record: Recordable) => string);
  dataSource?: Recordable[]; // 数据
  patination?: PaginationProps | boolean; // 分页
  bordered?: boolean; // 是否展示边框
  loading?: boolean;
  components?: object; // 组件，会覆盖默认 table 元素
  size?: SizeType;
  title?: VNodeChild | JSX.Element | string | ((data: Recordable) => string);
  titleHelpMessage?: string | string[]; // 标题右侧提示
  ellipsis?: boolean; // 文本超过宽度是否展示
  pagination?: PaginationProps | boolean; // 分页配置
  emptyDataIsShowTable?: boolean; // 通过搜索表单筛选表格数据的时候，如果没有数据是否显示表格
  useSearchForm?: boolean; // 是否使用搜索表单
  autoCreateKey?: boolean; // 是否自动生成key
  showIndexColumn?: boolean; // 是否显示序号列
  showTableSetting?: boolean; // 显示表格设置
  tableSetting?: TableSetting;
  actionColumn?: BasicColumn; // 操作列配置
}

export interface TableActionType {
  reload: (opt?: FetchParams) => Promise<void>;
  getSelectedRows: <T = Recordable>() => T[];
  getSelectedRowKeys: () => string[];
  getDataSource: <T = Recordable>() => T[];
  getRawDataSource: <T = Recordable>() => T;
  getColumns: (opt?: GetColumnsParams) => BasicColumn[];
  getPaginationRef: () => PaginationProps | boolean;
  getSize: () => SizeType;
  getRowSelection: () => TableRowSelection<Recordable>;
  getCacheColumns: () => BasicColumn[];
  getShowPagination: () => boolean;
  setTableData: <T = Recordable>(values: T[]) => void;
  setPagination: (info: Partial<PaginationProps>) => void;
  setColumns: (columns: BasicColumn[] | string[]) => void;
  setLoading: (loading: boolean) => void;
  setProps: (props: Partial<BasicTableProps>) => void;
  setSelectedRowKeys: (rowKeys: string[] | number[]) => void;
  setShowPagination: (show: boolean) => Promise<void>;
  setCacheColumnsByField?: (dataIndex: string | undefined, value: BasicColumn) => void;
  findTableDataRecord: (rowKey: string | number) => Recordable | void;
  updateTableDataRecord: (rowKey: string | number, record: Recordable) => Recordable | void;
  insertTableDataRecord: (record: Recordable, index?: number) => Recordable | void;
  deleteTableDataRecord: (rowKey: string | number | string[] | number[]) => void;
  updateTableData: (index: number, key: string, value: any) => Recordable;
  clearSelectedRowKeys: () => void;
  deleteSelectRowByKey: (key: string) => void;
  redoHeight: () => void;
  expandAll: () => void;
  expandRows: (keys: string[]) => void;
  collapseAll: () => void;
  scrollTo: (pos: string) => void;
  emit?: EmitType;
}
