import { RoleInfo } from "/@/api/model/userModel";
import { ErrorTypeEnum } from "/@/enums/exceptionEnum";

export interface UserInfo {
  userId: string | number;
  userName: string;
  realName: string;
  avatar: string;
  desc?: string;
  homePath?: string;
  roles: RoleInfo[];
}

export interface LockInfo {
  password?: string | undefined;
  isLock?: boolean;
}

export interface ErrorLogInfo {
  type: ErrorTypeEnum;
  file: string;
  name?: string;
  message: string;
  stack?: string;
  detail: string;
  url: string;
  time?: string;
}
