<template>
  <a-button v-bind="getBindValue" :class="getButtonClass">
    <template #default="data">
      <!-- TODO Button 文字前后 Icon 待实现  -->
      <slot v-bind="data || {}" />
    </template>
  </a-button>
</template>

<script lang="ts">
  export default defineComponent({
    name: "BasicButton",
    inheritAttrs: false,
  });
</script>

<script lang="ts" setup>
  import { computed, unref } from "vue";
  import { buttonProps } from "./props";
  import { useAttrs } from "/@/hooks/core/useAttrs";

  const props = defineProps(buttonProps);
  const attrs = useAttrs({ excludeDefaultKeys: false });
  const getButtonClass = computed(() => {
    const { color, disabled } = props;

    return [
      {
        [`ant-btn-${color}`]: !!color,
        [`is-disabled`]: disabled,
      },
    ];
  });

  const getBindValue = computed(() => {
    ({
      ...unref(attrs),
      ...props,
    });
  });
</script>
