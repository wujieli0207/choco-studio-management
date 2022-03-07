import type { PropType as VuePropType } from "vue";

declare global {
  declare type Recordable<T = any> = Record<string, T>;
}
