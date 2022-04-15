import axios, { AxiosRequestConfig, Canceler } from "axios";
import { isFunction } from "/@/utils/is";

let pendingMap = new Map<string, Canceler>();

export const getPendingUrl = (config: AxiosRequestConfig) =>
  [config.method, config.url].join("&");

export class AxiosCanceler {
  /**
   *
   * @param config
   * @description 新增 pending 状态请求
   */
  addPending(config: AxiosRequestConfig) {
    this.removePending(config);

    const url = getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          pendingMap.set(url, cancel);
        }
      });
  }

  /**
   *
   * @param config
   * @description 撤销所有状态 pending 状态请求
   */
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel();
    });
    pendingMap.clear();
  }

  /**
   *
   * @param config
   * @description 撤销一个状态 pending 状态请求
   */
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config);

    if (pendingMap.has(url)) {
      const cancel = pendingMap.get(url);
      cancel && isFunction(cancel) && cancel(url);
      pendingMap.delete(url);
    }
  }

  reset(): void {
    pendingMap = new Map<string, Canceler>();
  }
}
