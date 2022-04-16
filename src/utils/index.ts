<<<<<<< HEAD
import { App, Plugin } from "vue";
=======
import { App, unref } from "vue";
>>>>>>> origin2/master
import { isObject } from "/@/utils/is";

export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let params = "";

  for (const key in obj) {
    params += `${key}=${encodeURIComponent(obj[key])}&`;
  }
  params = params.replace(/&$/, "");

  return /\?$/.test(baseUrl) ? `${baseUrl}${params}` : `${baseUrl.replace(/\/?$/, "?")}${params}`;
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
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

export function getDynamicProps<T, U>(props: T): Partial<U> {
  const ret: Recordable = {};

  Object.keys(props).map((key) => {
    ret[key] = unref((props as Recordable)[key]);
  });

  return ret as Partial<U>;
}
