import { ArticleStatusEnum } from "/@/enums/articleEnum";

export interface ArticleList {
  articleId: string;
  articleTitle: string;
  createTime: string;
  catagory: string[];
  tag: string[];
  status: ArticleStatusEnum;
}
