import { clone } from "lodash-es";
import { deepMerge, setObjToUrlParams } from "/@/utils";
import { ChocoAxios } from "./Axios";
import { AxiosTransform, CreateAxiosOptions } from "./axiosTransform";
import { ContentTypeEnum, RequestEnum, ResultEnum } from "/@/enums/httpEnum";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { RequestOptions, Result } from "/#/axios";
import { useGlobSetting } from "/@/settings";
import { isString } from "/@/utils/is";
import { formatRequestDate, joinTimestamp } from "./helper";

const globSetting = useGlobSetting();
const urlPrefix = globSetting.urlPrefix;

const transform: AxiosTransform = {
  /**
   *
   * @param res
   * @param options
   * @description 处理请求数据。如果数据不是预期格式，可直接抛出错误
   */
  transformRequestHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isTransformResponse, isReturnNativeResponse } = options;

    // 需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res;
    }

    // 不进行数据处理，直接返回数据，用于可能需要直接获取 code，data，message 的场景
    if (!isTransformResponse) {
      return res.data;
    }

    const { data } = res;
    if (!data) {
      throw new Error("请求出错，请稍后重试");
    }

    // code，result，message为 后台统一的字段，在 axios.d.ts 的 Result 定义
    const { code, result, message } = data;

    const hasSuccess = data && Reflect.has(data, "code") && code === ResultEnum.SUCCESS;
    if (hasSuccess) {
      return result;
    }

    // 可以增加更多定义，在 httpEnum 的 ResultEnum 中增加
    let timeoutMsg = "";
    switch (code) {
      default:
        if (message) {
          timeoutMsg = message;
        }
    }

    // TODO 错误请求弹窗部分待添加

    throw new Error(timeoutMsg || "请求出错，请稍后重试");
  },

  /**
   *
   * @param config
   * @param options
   * @description 请求前数据处理
   */
  beforeRequestHook: (config: AxiosRequestConfig, options: RequestOptions): AxiosRequestConfig => {
    const { apiUrl, joinPrefix, urlPrefix, formatDate, joinTime = true, joinParamsToUrl } = options;

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }

    const params = config.params || {};
    const data = config.data || false;
    formatDate && data && !isString(data) && formatRequestDate(data);
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存拿数据
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      } else {
        // 兼容 restful 风格
        config.url = `${config.url}${params}${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);

        if (Reflect.has(config, "data") && config.data && Object.keys(config.data).length > 0) {
          config.data = data;
          config.params = params;
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params;
          config.params = undefined;
        }

        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data)
          );
        }
      } else {
        // 兼容 restful 风格
        config.url = `${config.url}${params}`;
        config.params = undefined;
      }
    }

    return config;
  },

  // ! TODO 请求携带 Token 功能待添加
  // ! TODO 响应失败处理函数待添加
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new ChocoAxios(
    deepMerge(
      {
        timeout: 10 * 1000,
        headers: {
          "Content-Type": ContentTypeEnum.JSON,
        },
        transform: clone(transform),
        // 参考文档：https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
        authenticationScheme: "",
        // 以下配置项都可以在独立请求覆盖
        requestOptions: {
          apiUrl: globSetting.apiUrl,
          urlPrefix: urlPrefix,
          // 默认忽略重复请求
          ignoreCancelToken: true,
          // 默认将 prefix 添加到 url
          joinPrefix: true,
          // 默认不返回原生响应头
          isReturnNativeResponse: false,
          // 默认对返回数据处理
          isTransformResponse: true,
          // post 请求时不会将参数添加到 url
          joinParamsToUrl: false,
          // 默认格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: "message",
          // 默认加入时间戳
          joinTime: true,
          // TODO 暂时不携带携带 Token
          withToken: false,
        },
      },
      opt || {}
    )
  );
}

export const defHttp = createAxios();
