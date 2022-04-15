import { isFunction } from "/@/utils/is";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { CreateAxiosOptions } from "./axiosTransform";
import { ContentTypeEnum, RequestEnum } from "/@/enums/httpEnum";
import qs from "qs";
import { AxiosCanceler } from "./axiosCancel";
import { RequestConfig } from "./types";
import { RequestOptions, Result } from "/#/axios";
import { cloneDeep } from "lodash-es";

export class ChocoAxios {
  private axiosInstance: AxiosInstance;
  private readonly options: CreateAxiosOptions;

  constructor(options: CreateAxiosOptions) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }

  private createAxios(config: CreateAxiosOptions): void {
    this.axiosInstance = axios.create(config);
  }

  private getTransform() {
    const { transform } = this.options;
    return transform;
  }

  getAxios(): AxiosInstance {
    return this.axiosInstance;
  }

  configAxios(config: CreateAxiosOptions) {
    if (!this.axiosInstance) {
      return;
    }
    this.createAxios(config);
  }

  setHeader(headers: any): void {
    if (!this.axiosInstance) {
      return;
    }
    Object.assign(this.axiosInstance.defaults.headers, headers);
  }

  supportFormData(config: RequestConfig) {
    const headers = config.headers || this.options.headers;
    const contentType = headers?.["Content-Type"] || headers?.["content-type"];

    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, "data") ||
      config.method?.toUpperCase() === RequestEnum.GET
    ) {
      return config;
    }

    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: "brackets" }),
    };
  }

  private setupInterceptors() {
    const transform = this.getTransform();
    if (!transform) {
      return;
    }

    const {
      requestInterceptors,
      responseInterceptors,
      requestInterceptorsCatch,
      responseInterceptorsCatch,
    } = transform;

    const axiosCanceler = new AxiosCanceler();

    // 请求拦截器
    this.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // 如果开启了取消重复请求，则禁止取消重复请求
        // @ts-ignore
        const { ignoreCancelToken } = config.requestOptions;

        const ignoreCancel = undefined
          ? ignoreCancelToken
          : this.options.requestOptions?.ignoreCancelToken;

        !ignoreCancel && axiosCanceler.addPending(config);
        if (requestInterceptors && isFunction(requestInterceptors)) {
          config = requestInterceptors(config, this.options);
        }
        return config;
      },
      undefined
    );

    // 捕获请求拦截器异常
    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(
        undefined,
        requestInterceptorsCatch
      );

    // 响应拦截器
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && axiosCanceler.removePending(res.config);

      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res);
      }

      return res;
    }, undefined);

    // 捕获响应拦截异常
    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(
        undefined,
        responseInterceptors
      );
  }

  get<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request({ ...config, method: RequestEnum.GET }, options);
  }

  post<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request({ ...config, method: RequestEnum.POST }, options);
  }

  put<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request({ ...config, method: RequestEnum.PUT }, options);
  }

  delete<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request({ ...config, method: RequestEnum.DELETE }, options);
  }

  request<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    let conf: CreateAxiosOptions = cloneDeep(config);
    const transform = this.getTransform();

    const { requestOptions } = this.options;

    const opt: RequestOptions = Object.assign({}, requestOptions, options);

    const { beforeRequestHook, requestCatchHook, transformRequestHook } =
      transform || {};
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt);
    }
    conf.requestOptions = opt;

    conf = this.supportFormData(conf);

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          if (transformRequestHook && isFunction(transformRequestHook)) {
            try {
              const ret = transformRequestHook(res, opt);
              resolve(ret);
            } catch (error) {
              reject(error || new Error("request error!"));
            }
            return;
          }
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt));
            return;
          }
          if (axios.isAxiosError(e)) {
            // 是否需要重写 axios error 在此处添加
          }
          reject(e);
        });
    });
  }
}
