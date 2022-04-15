import {
  GetUserInfoModel,
  LoginParams,
  LoginresultModel,
} from "./model/userModel";
import { ErrorMessageMode } from "/#/axios";
import { defHttp } from "/@/utils/http/axios";

enum Api {
  LOGIN = "/login",
  GET_USER_INFO = "/getUserInfo",
}

/**
 *
 * @description 用户登录
 */
export const loginApi = (
  params: LoginParams,
  mode: ErrorMessageMode = "modal"
) => {
  return defHttp.post<LoginresultModel>(
    { url: Api.LOGIN, params },
    { errorMessageMode: mode }
  );
};

/**
 *
 * @description 获取用户信息
 */
export const getUserInfoApi = () => {
  return defHttp.get<GetUserInfoModel>(
    { url: Api.GET_USER_INFO },
    { errorMessageMode: "none" }
  );
};
