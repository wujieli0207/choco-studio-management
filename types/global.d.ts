import type { PropType as VuePropType } from "vue";

declare global {
  declare type Recordable<T = any> = Record<string, T>;

  declare type Nullable<T> = T | null;

  declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
  };
}
