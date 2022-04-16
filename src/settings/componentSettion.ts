import { SorterResult } from "ant-design-vue/lib/table/interface";

export default {
  table: {
    fetchSetting: {
      pageField: "page",
      sizeField: "pageSize",
      listField: "items",
      totalField: "total",
    },
    pageSizeOptions: ["10", "50", "80", "100"], // 每页展示条数可选择配置
    defaultPageSize: 10, // 每页展示条数
    defaultSize: "middle",
    defaultSortFn: (sortInfo: SorterResult) => {
      const { field, order } = sortInfo;
      if (field && order) {
        return {
          field,
          order,
        };
      } else {
        return {};
      }
    },
    defaultFilterFn: (data: Partial<Recordable<string[]>>) => {
      return data;
    },
  },
  scrollbar: {
    native: false, // 是否使用原生滚动条
  },
};
