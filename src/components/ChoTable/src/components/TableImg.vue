<template>
  <div
    v-if="imgList && imgList.length"
    :class="prefixCls"
    class="flex items-center mx-auto"
    :style="getWrapStyls"
  >
    <a-badge v-if="simpleShow" :count="!simpleShow || imgList?.length === 1 ? 0 : imgList?.length">
      <div>
        <a-image-preview-group>
          <template v-for="(img, index) in imgList" :key="img">
            <a-image
              :width="size"
              :src="srcPrefix + img"
              :style="{ display: index === 0 ? '' : 'none !important' }"
            />
          </template>
        </a-image-preview-group>
      </div>
    </a-badge>
    <a-image-preview-group v-if="!simpleShow">
      <template v-for="(img, index) in imgList" :key="img">
        <a-image
          :width="size"
          :src="srcPrefix + img"
          :style="{ marginLeft: index === 0 ? 0 : margin }"
        />
      </template>
    </a-image-preview-group>
  </div>
</template>

<script lang="ts" setup>
  import { computed, CSSProperties, PropType } from "vue";
  import { useDesign } from "/@/hooks/web/useDesign";
  import { isString } from "/@/utils/is";

  const props = defineProps({
    // 支出传入一张图片或者多张图片 List
    image: {
      type: [Array, String] as PropType<string[] | string>,
    },
    size: {
      type: Number,
      default: 40,
    },
    // 是否简单显示（只显示第一章图片）
    simpleShow: {
      type: Boolean,
      default: true,
    },
    // 简单模式是否显示图片数量的 badge
    showBadge: {
      type: Boolean,
      default: false,
    },
    // 图片间距
    margin: {
      type: Number,
      default: 0,
    },
    // src 前缀，默认加在 imgList 每一项之前
    srcPrefix: {
      type: String,
      default: "",
    },
  });

  const imgList = computed(() => {
    if (isString(props.image)) {
      return [props.image];
    }
    if (Array.isArray(props.image)) {
      return props.image;
    }
    return [];
  });

  const getWrapStyls = computed((): CSSProperties => {
    const { size } = props;
    const s = `${size}px`;
    return {
      height: s,
      width: s,
    };
  });

  const { prefixCls } = useDesign("basic-table-img");
</script>

<style lang="less">
  @import "/@/styles/var";

  @prefix-cls: ~"@{namespace}-basic-table-img";

  .@{prefix-cls} {
    .ant-image {
      margin-right: 4px;
      cursor: zoom-in;

      img {
        border-radius: 2px;
      }
    }

    .img-div {
      display: inline-grid;
    }
  }
</style>
