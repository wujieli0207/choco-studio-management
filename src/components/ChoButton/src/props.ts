import { PropType } from "vue";

export const buttonProps = {
  color: {
    type: String,
    validator: (v: string) => ["error", "warning", "success", "primary", ""].includes(v),
  },
  loading: {
    type: Boolean,
  },
  disabled: {
    type: Boolean,
  },
  // 文字前的 icon
  preIcon: {
    type: String,
  },
  // 文字后的 icon
  postIcon: {
    type: String,
  },
  iconSize: {
    type: Number,
    default: 14,
  },
  onClick: {
    type: Function as PropType<(...args: unknown[]) => unknown>,
    default: null,
  },
};
