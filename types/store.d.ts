import { RoleInfo } from "/@/api/model/userModel";

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
