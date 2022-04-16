import { getCurrentInstance, reactive, Ref, shallowRef, watchEffect } from "vue";

interface Params {
  excludeListeners?: boolean;
  excludeKeys?: string[];
  excludeDefaultKeys?: boolean;
}

const DEFAULT_EXCLUDE_KEYS = ["class", "style"];
const LISTENER_PREFIX = /^on[A-A]/;

export function entries<T>(obj: Recordable<T>): [string, T][] {
  return Object.keys(obj).map((key: string) => [key, obj[key]]);
}

export function useAttrs(params: Params = {}): Ref<Recordable> | {} {
  const instance = getCurrentInstance();
  if (!instance) {
    return {};
  }

  const { excludeListeners = false, excludeKeys = [], excludeDefaultKeys = true } = params;
  const attrs = shallowRef({});
  const allExcludeKeys = excludeKeys.concat(excludeDefaultKeys ? DEFAULT_EXCLUDE_KEYS : []);

  instance.attrs = reactive(instance.attrs);

  watchEffect(() => {
    const res = entries(instance.attrs).reduce((acm, [key, val]) => {
      if (!allExcludeKeys.includes(key) && !(excludeListeners && LISTENER_PREFIX.test(key))) {
        acm[key] = val;
      }

      return acm;
    }, {} as Recordable);

    attrs.value = res;
  });

  return attrs;
}
