export type ErrorMessageMode = "none" | "modal" | "message" | undefined;

export interface RequestOptions {
  apiUrl?: string;
  urlPrefix: string;
  // 是否忽略重复请求
  ignoreCancelToken?: boolean;
  // 是否将 prefix 添加到 url
  joinPrefix?: boolean;
  // 是否返回原生响应头 比如：需要获取响应头时使用该属性
  isReturnNativeResponse: boolean;
  // 是否对返回数据处理
  isTransformResponse: boolean;
  // post 请求时是否将参数添加到 url
  joinParamsToUrl: boolean;
  // 是否格式化提交参数时间
  formatDate: boolean;
  errorMessageMode?: ErrorMessageMode;
  // 是否加入时间戳
  joinTime?: boolean;
  // 是否携带 Token
  withToken?: boolean;
}

export interface Result<T = any> {
  code: number;
  type: "success" | "error" | "warning";
  message: string;
  result: T;
}
