<template>
  <svg-icon
    v-if="isSvgIcon"
    :name="getSvgIcon"
    :size="size"
    :class="[$attrs.class, 'anticon']"
    :spin="spin"
  />
  <span
    v-if="!isSvgIcon"
    ref="elRef"
    :class="[$attrs.class, 'app-iconify anticon', spin && 'app-iconify-spin']"
    :style="getWrapStyle"
  />
</template>

<script lang="ts" setup>
  import { renderSVG } from "@iconify/iconify";
  import { computed, CSSProperties, nextTick, onMounted, ref, unref, watch } from "vue";
  import { isString } from "/@/utils/is";
  import SvgIcon from "./SvgIcon.vue";

  const SVG_END_WITH_FLAG = "|svg";

  const props = defineProps({
    icon: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
    size: {
      type: String || Number,
      default: 16,
    },
    spin: {
      type: Boolean,
      default: false,
    },
    prefix: {
      type: String,
      default: "",
    },
  });

  const elRef = ref<ElRef>(null);

  const isSvgIcon = computed(() => props.icon?.endsWith(SVG_END_WITH_FLAG));
  const getSvgIcon = computed(() => props.icon?.replace(SVG_END_WITH_FLAG, ""));
  const getIconRef = computed(() => `${props.prefix ? props.prefix + ":" : ""}${props.icon}`);

  const update = async () => {
    if (unref(isSvgIcon)) return;

    const el = unref(elRef);
    if (!el) return;

    await nextTick();
    const icon = unref(getIconRef);
    if (!icon) return;

    const svg = renderSVG(icon, {});
    if (svg) {
      el.textContent = "";
      el.appendChild(svg);
    } else {
      const span = document.createElement("span");
      span.className = "iconify";
      span.dataset.icon = icon;
      el.textContent = "";
      el.appendChild(span);
    }
  };

  const getWrapStyle = computed((): CSSProperties => {
    const { size, color } = props;

    return {
      fontSize: `${isString(size) ? parseInt(size) : size}px`,
      color: color,
      display: "inline-flex",
    };
  });

  watch(() => props.icon, update, { flush: "post" });

  onMounted(() => {
    update();
  });
</script>
