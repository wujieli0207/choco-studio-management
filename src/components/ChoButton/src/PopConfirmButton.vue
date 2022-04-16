<script lang="ts">
  import { Popconfirm } from "ant-design-vue";
  import { omit } from "lodash-es";
  import { computed, unref, defineComponent, h } from "vue";
  import BasicButton from "./BasicButton.vue";
  import { useAttrs } from "/@/hooks/core/useAttrs";
  import { extendSlots } from "/@/utils/helper/tsxHelper";

  const props = {
    // 是否允许下拉菜单（drop-down menu）
    enable: {
      type: Boolean,
      default: true,
    },
  };

  export default defineComponent({
    name: "PopButton",
    inheritAttrs: false,
    props,
    setup(props, { slots }) {
      const attrs = useAttrs();

      const getBindValues = computed(() => {
        return Object.assign(
          {
            okText: "确认",
            cancelText: "取消",
          },
          { ...props, ...unref(attrs) }
        );
      });

      return () => {
        const bindValues = omit(unref(getBindValues), "icon");
        const btnBind = omit(bindValues, "title") as Recordable;
        if (btnBind.disable) {
          btnBind.color = "";
        }

        const Button = h(BasicButton, btnBind, extendSlots(slots));

        if (!props.enable) {
          return Button;
        }

        return h(Popconfirm, bindValues, { default: () => Button });
      };
    },
  });
</script>
