import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue";
import { isBoolean } from "/@/utils/is";
import { computed, ComputedRef, ref, unref, watch } from "vue";
import type { BasicTableProps } from "../types/table";
import type { PaginationProps } from "../types/pagination";
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from "../const";

interface ItemRender {
  page: number;
  type: "page" | "prev" | "next";
  originalElement: any;
}

function itemRender({ page, type, originalElement }: ItemRender) {
  if (type === "prev") {
    return page === 0 ? null : <LeftOutlined />;
  }
  if (type === "next") {
    return page === 1 ? null : <RightOutlined />;
  }
  return originalElement;
}

export function usePagination(refProps: ComputedRef<BasicTableProps>) {
  const configRef = ref<PaginationProps>({});
  const show = ref(true);

  watch(
    () => unref(refProps).patination,
    (pagination) => {
      if (!isBoolean(pagination) && pagination) {
        configRef.value = {
          ...unref(configRef),
          ...(pagination ?? {}),
        };
      }
    }
  );

  const getPaginationInfo = computed((): PaginationProps | boolean => {
    const { pagination } = unref(refProps);

    if (!unref(show) || (isBoolean(pagination) && !pagination)) {
      return false;
    }

    return {
      current: 1,
      pageSize: PAGE_SIZE,
      size: "small",
      defaultPageSize: PAGE_SIZE,
      showTotal: (total) => `共${total}条数据`,
      showSizeChanger: true,
      pageSizeOptions: PAGE_SIZE_OPTIONS,
      itemRender: itemRender,
      showQuickJumber: true,
      ...(isBoolean(pagination) ? {} : pagination),
      ...unref(configRef),
    };
  });

  function getPagination() {
    return unref(getPaginationInfo);
  }

  function setPagination(info: Partial<PaginationProps>) {
    const paginationInfo = unref(getPaginationInfo);
    configRef.value = {
      ...(!isBoolean(paginationInfo) ? paginationInfo : {}),
      ...info,
    };
  }

  function getShowPagination() {
    return unref(show);
  }

  function setShowPagination(flag: boolean) {
    show.value = flag;
  }

  return {
    getPaginationInfo,
    getPagination,
    setPagination,
    getShowPagination,
    setShowPagination,
  };
}
