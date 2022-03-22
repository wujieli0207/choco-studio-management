<template>
  <div :class="[prefixCls, getAlign]" @click="onCellClick">
    <template v-for="(action, index) in getActions" :key="`${index}-${action.label}`">
      <a-tooltip v-if="action.tooltip" v-bind="getTooltip(action.tooltip)"> </a-tooltip>
      <!-- TODO PopConfirmButton -->
      <a-divider
        v-if="divider && index < getActions.length - 1"
        type="vertical"
        class="action-divider"
      />
    </template>
    <Dropdown
      v-if="dropDownActions && getDropdownList.length > 0"
      :trigger="['hover']"
      :drop-menu-list="getDropdownList"
      :popconfirm="true"
    >
      <slot name="more" />
      <a-button v-if="!$slots.more" type="link" size="small">
        <MoreOutlined class="icon-more" />
      </a-button>
    </Dropdown>
  </div>
</template>

<script lang="ts" setup>
  import { computed, PropType, toRaw, unref } from "vue";
  import type { ActionItem } from "../types/tableAction";
  import type { TableActionType } from "../types/table";
  import { useDesign } from "/@/hooks/web/useDesign";
  import { useTableContext } from "../hooks/useTableContext";
  import { ACTION_COLUMN_FLAG } from "../const";
  import { TooltipProps } from "ant-design-vue";
  import { isString } from "/@/utils/is";
  import Dropdown from "/@/components/ChoDropdown/src/Dropdown.vue";
  import { MoreOutlined } from "@ant-design/icons-vue";

  const props = defineProps({
    actions: {
      type: Array as PropType<ActionItem[]>,
      default: null,
    },
    dropDownActions: {
      type: Array as PropType<ActionItem[]>,
      default: null,
    },
    divider: {
      type: Boolean,
      default: true,
    },
    outside: {
      type: Boolean,
      default: false,
    },
    stopButtonPropagation: {
      type: Boolean,
      default: false,
    },
  });

  const { prefixCls } = useDesign("basic-table-action");
  let table: Partial<TableActionType> = {};
  if (!props.outside) {
    table = useTableContext();
  }

  // TODO 按钮权限控制待处理

  const getActions = computed(() => {
    // TODO 按钮权限控制待处理
    return (toRaw(props.actions) || []).map((action) => {
      const { popConfirm } = action;
      return {
        getPopupContainer: () => unref((table as any)?.wrapRef.value) ?? document.body,
        type: "link",
        size: "small",
        ...action,
        ...(popConfirm || {}),
        onConfirm: popConfirm?.confirm,
        conCancel: popConfirm?.cancel,
        enable: !!popConfirm,
      };
    });
  });

  const getDropdownList = computed((): any[] => {
    // TODO 权限待处理
    const list = toRaw(props.dropDownActions);
    return list.map((action, index) => {
      const { label, popConfirm } = action;
      return {
        ...action,
        ...popConfirm,
        onConfirm: popConfirm?.confirm,
        onCancel: popConfirm?.cancel,
        text: label,
        divider: index < list.length - 1 ? props.divider : false,
      };
    });
  });

  const getAlign = computed(() => {
    const columns = (table as TableActionType)?.getColumns?.() || [];
    const actionColumn = columns.find((item) => item.flag === ACTION_COLUMN_FLAG);
    return actionColumn?.align ?? "left";
  });

  function getTooltip(data: string | TooltipProps): TooltipProps {
    return {
      getPopupContainer: () => unref((table as any)?.wrapRef.value) ?? document.body,
      placement: "bottom",
      ...(isString(data) ? { title: data } : data),
    };
  }

  function onCellClick(e: MouseEvent) {
    if (!props.stopButtonPropagation) {
      return;
    }

    const path = e.composedPath() as HTMLElement[];
    const isInButton = path.find((element) => {
      return element.tagName?.toUpperCase() === "BUTTON";
    });
    isInButton && e.stopPropagation();
  }
</script>

// TODO 样式待处理
