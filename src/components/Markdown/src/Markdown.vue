<template>
  <div ref="wrapRef"></div>
</template>

<script lang="ts" setup>
import "vditor/dist/index.css";
import {
  nextTick,
  onBeforeMount,
  onDeactivated,
  ref,
  Ref,
  unref,
  useAttrs,
} from "vue";
import Vditor from "vditor";
import { onMountedOrActivated } from "/@/hooks/core/onMountedOrActivated";

const props = defineProps({
  height: {
    type: Number,
    default: 360,
  },
  value: {
    type: String,
    default: "",
  },
});
const emits = defineEmits(["update:value", "change", "get"]);
const attrs = useAttrs();
console.log("attrs: ", attrs);

const wrapRef = ref<ElRef>(null);
const vditorRef = ref(null) as Ref<Nullable<Vditor>>;
const initedRef = ref(false);

const valueRef = ref(props.value || "");

/**
 * @description 初始化 markdown 组件
 */
function init() {
  const wrapEl = unref(wrapRef) as HTMLElement;
  if (!wrapEl) return;

  const bindValue = { ...props, ...attrs };
  const insEditor = new Vditor(wrapEl, {
    theme: "classic",
    mode: "sv",
    cache: {
      enable: false,
    },
    input: (v) => {
      valueRef.value = v;
      emits("update:value", v);
      emits("change", v);
    },
    ...bindValue,
    after: () => {
      nextTick(() => {
        insEditor.setValue(valueRef.value);
        vditorRef.value = insEditor;
        initedRef.value = true;
        emits("get", instance);
      });
    },
  });
}

function destroy() {
  const vditorInstance = unref(vditorRef);
  if (!vditorInstance) return;

  try {
    vditorInstance?.destroy?.();
  } catch (error) {
    vditorRef.value = null;
    initedRef.value = false;
  }
}

const instance = {
  getVditor: (): Vditor => vditorRef.value!,
};

onMountedOrActivated(init);

onBeforeMount(destroy);
onDeactivated(destroy);
</script>
