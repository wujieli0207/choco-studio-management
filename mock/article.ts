import { MockMethod } from "vite-plugin-mock";
import { requestParams, resultSuccess } from "./_util";
import { ArticleList } from "/@/api/model/articleModel";
import { Random } from "mockjs";

const MOCK_LIST_NUM = 15;

// TODO 模拟返回数据
const mockArticleList: ArticleList[] = [];

for (let i = 0; i < MOCK_LIST_NUM; i++) {
  let article: ArticleList = {
    articleId: i.toString(),
    articleTitle: Random.ctitle(5, 20),
    createTime: Random.datetime("yyyy-MM-dd HH:mm:ss"),
    catagory: [Random.cword(3)],
    tag: [Random.cword(5), Random.cword(3)],
    status: Random.integer(0, 3),
  };
  mockArticleList.push(article);
}

export default [
  {
    url: "/api/article/getAll",
    timeout: 200,
    method: "get",
    response: (request: requestParams) => {
      return resultSuccess(mockArticleList);
    },
  },
] as MockMethod[];
