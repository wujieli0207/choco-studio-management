import { RouteRecordRaw } from "vue-router";
import { defineComponent } from "vue";

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import("*.vue")>)
  | (() => Promise<T>);

interface AppRouteMeta {
  title: string;
}

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, "meta"> {
  path: string;
  name: string;
  component: Component;
  meta: AppRouteMeta;
}
