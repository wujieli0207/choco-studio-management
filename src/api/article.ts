import { ArticleList } from "./model/articleModel";
import {
  GetUserInfoModel,
  LoginParams,
  LoginresultModel,
} from "./model/userModel";
import { ErrorMessageMode } from "/#/axios";
import { defHttp } from "/@/utils/http/axios";

enum Api {
  GET_ARTICLE_LIST = "/article/getAll",
}

/**
 *
 * @description 获取用户信息
 */
export const getArticleListApi = () => {
  return defHttp.get<ArticleList[]>(
    { url: Api.GET_ARTICLE_LIST },
    { errorMessageMode: "none" }
  );
};
