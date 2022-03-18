import { isString } from "/@/utils/is";
import { RouteLocationRaw, Router, useRouter } from "vue-router";
import { PageEnum } from "/@/enums/pageEnum";

export type RouteLocationRawEx = Omit<RouteLocationRaw, "path"> & {
  path: PageEnum;
};

function handleError(e: Error) {
  console.log(e);
}

/**
 *
 * @description 跳转页面使用
 */
export function useGo(_router?: Router) {
  const { push, replace } = _router || useRouter();

  function go(opt: PageEnum | RouteLocationRawEx | string = PageEnum.BASE_HOME, isReplace = false) {
    if (!opt) {
      return;
    }

    if (isString(opt)) {
      isReplace ? replace(opt).catch(handleError) : push(opt).catch(handleError);
    } else {
      const o = opt as RouteLocationRaw;
      isReplace ? replace(o).catch(handleError) : push(o).catch(handleError);
    }
  }

  return go;
}
