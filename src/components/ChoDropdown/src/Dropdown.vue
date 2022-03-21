<template>
  <a-dropdown :trigger="trigger" v-bind="$attrs">
    <span><slot /></span>
    <template #overlay>
      <a-menu :selected-keys="selectedKey">
        <template v-for="item in dropMenuList" :key="`${item.event}`">
          <a-menu-item
            v-bind="getAttr(item.event)"
            :disabled="item.disabled"
            @click="handleClickMenu(item)"
          >
            <a-popconfirm
              v-if="popconfirm && item.popConfirm"
              v-bind="getPopConfirmAttrs(item.popConfirm)"
            >
              <template v-if="item.popConfirm.icon" #icon>
                <Icon :icon="item.popConfirm.icon" />
              </template>
              <div>
                <Icon v-if="item.icon" :icon="item.icon" />
                <sapn class="ml-1">{{ item.text }}</sapn>
              </div>
            </a-popconfirm>
            <template v-else>
              <Icon v-if="item.icon" :icon="item.icon" />
              <sapn class="ml-1">{{ item.text }}</sapn>
            </template>
          </a-menu-item>
          <a-menu-divider v-if="item.divider" :key="`d-${item.event}`" />
        </template>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
  import { omit } from "lodash-es";
  import { computed, PropType } from "vue";
  import { DropMenu } from "./types";
  import { isFunction } from "/@/utils/is";
  import Icon from "/@/components/ChoIcon";

  const props = defineProps({
    trigger: {
      type: Array as PropType<("contextmenu" | "click" | "hover")[]>,
      default: () => {
        return ["contextmenu"];
      },
    },
    dropMenuList: {
      type: Array as PropType<(DropMenu & Recordable)[]>,
      default: () => [],
    },
    selectedKey: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    popconfirm: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(["menuEvent"]);

  const getAttr = (key: string | number) => ({ key });

  const getPopConfirmAttrs = computed(() => {
    return (attrs: any) => {
      const originAttrs = omit(attrs, ["confirm", "cancel", "icon"]);
      if (!attrs.onConfirm && attrs.confirm && isFunction(attrs.confirm))
        originAttrs["onConfirm"] = attrs.confirm;
      if (!attrs.onCancel && attrs.cancel && isFunction(attrs.cancel))
        originAttrs["onCancel"] = attrs.cancel;
      return originAttrs;
    };
  });

  function handleClickMenu(item: DropMenu) {
    const { event } = item;
    const menu = props.dropMenuList.find((item) => `${item.event}` === `${event}`);
    emit("menuEvent", menu);
    item.onClick?.();
  }
</script>
