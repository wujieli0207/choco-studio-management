import { RouteRecordRaw, RouteMeta } from "vue-router";
import { defineComponent } from "vue";

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import("*.vue")>)
  | (() => Promise<T>);

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, "children"> {
  path: string;
  name: string;
  meta: RouteMeta;
  component?: Component;
  children?: AppRouteRecordRaw[];
  props?: Recordable;
}
