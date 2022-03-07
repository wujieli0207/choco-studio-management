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
