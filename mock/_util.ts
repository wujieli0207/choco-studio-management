import { ResultEnum } from "/@/enums/httpEnum";

export interface requestParams {
  method: string;
  body: any;
  headers?: { authorization?: string };
  query: any;
}

export function resultSuccess<T = Recordable>(result: T, { message = "请求成功" } = {}) {
  return {
    code: ResultEnum.SUCCESS,
    result,
    message,
    type: "success",
  };
}

export function resultError(message = "请求失败", { code = ResultEnum.ERROR, result = null } = {}) {
  return {
    code,
    result,
    message,
    type: "error",
  };
}

export function getRequestToken({ headers }: requestParams): string | undefined {
  return headers?.authorization;
}
