import { VNodeChild } from "vue";

interface PaginationrenderProps {
  page: number;
  type: "page" | "prev" | "next";
  originalElement: any;
}

export interface PaginationProps {
  total?: number; // 数据总数, 默认为 0

  defaultCurrent?: number; // 默认初始页数, 默认为 1

  current?: number; // 当前页数

  defaultPageSize?: number; // 默认每页数据条数, 默认为 10

  pageSize?: number; // 每页数据条数

  hideOnSinglePage?: boolean; // 在只有一页数据的情况是否隐藏

  showSizeChanger?: boolean; // 每页数据条数是否可以改变

  pageSizeOptions?: string[]; // 数据条数改变选项，默认为：['10', '20', '30', '40']

  showQuickJumber?: boolean | object; // 是否可以直接跳转到某一页

  showTotal?: (total: number, range: [number, number]) => any; // 是否展示总数

  size?: string; // 翻页尺寸

  simple?: boolean; // 是否是简单模式

  itemRender?: (props: PaginationrenderProps) => VNodeChild | JSX.Element;
}
