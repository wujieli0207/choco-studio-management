import { App, Plugin } from "vue";

const toString = Object.prototype.toString;

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== "undefined";
}

export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val);
}

export function isNull(val: unknown): val is null {
  return val === null;
}

export function isNullAndUnDef(val: unknown): val is null | undefined {
  return isNull(val) && isUnDef(val);
}

export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isNull(val) || isUnDef(val);
}

export function isBoolean(val: unknown): val is boolean {
  return is(val, "Boolean");
}

export function isNumber(val: unknown): val is number {
  return is(val, "Number");
}

export function isString(val: unknown): val is string {
  return is(val, "String");
}

export function isRegExp(val: unknown): val is RegExp {
  return is(val, "RegExp");
}

export function isFunction(val: unknown): val is Function {
  return typeof val === "function";
}

export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, "Object");
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return is(val, "Promise") && isObject(val) && isFunction(val.then) && isFunction(val.then);
}

export function isWindow(val: any): val is Window {
  return typeof window !== "undefined" && is(val, "Window");
}

export function isElement(val: unknown): val is Element {
  return isObject(val) && !!val.tagName;
}

export function isMap(val: unknown): val is Map<any, any> {
  return is(val, "Map");
}

export const isServer = typeof window === "undefined";

export const isClient = !isServer;

export function isUrl(path: string): boolean {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
}

export function withInstall<T>(component: T, alias?: string) {
  const comp = component as any;
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component as T & Plugin;
}
