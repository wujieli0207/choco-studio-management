import { UserInfo } from "/#/store";

export interface RoleInfo {
  roleName: string;
  value: string;
}

export interface LoginParams {
  userName: string;
  password: string;
}

export interface GetUserInfoModel extends Omit<UserInfo, "homePath"> {}

export interface LoginresultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
}
