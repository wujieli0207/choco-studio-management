import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { ErrorMessageMode } from "/#/axios";
import { UserInfo } from "/#/store";
import { LoginParams } from "/@/api/model/userModel";
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from "/@/enums/cacheEnum";
import { RoleEnum } from "/@/enums/roleEnum";
import { store } from "/@/store";
import { getAuthCache, setAuthCache } from "/@/utils/auth";

interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  roleList: RoleEnum[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
}

export const useUserStore = defineStore({
  id: "userStore",
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
    roleList: [],
    sessionTimeout: false,
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY);
    },
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0
        ? this.roleList
        : getAuthCache<RoleEnum[]>(ROLES_KEY);
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime;
    },
  },
  actions: {
    setUserInfo(userInfo: UserInfo | null) {
      this.userInfo = userInfo;
      this.lastUpdateTime = new Date().getTime();
      setAuthCache(USER_INFO_KEY, userInfo);
    },
    setToken(token: string | undefined) {
      this.token = token || "";
      setAuthCache(TOKEN_KEY, token);
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList;
      setAuthCache(ROLES_KEY, roleList);
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    resetState() {
      this.userInfo = null;
      this.token = undefined;
      this.sessionTimeout = false;
    },
    async login(
      params: LoginParams & { goHome: boolean; mode?: ErrorMessageMode }
    ) {},
    async logout(goLogin = false) {},
  },
});

// export const useUserStore = defineStore("user", () => {
//   const userInfo: Nullable<UserInfo> = null;
//   let sessionTimeout = false;

//   function getUserInfo(): Nullable<UserInfo> {
//     return userInfo;
//   }

//   function getSessionTimeout(): boolean {
//     return sessionTimeout;
//   }

//   function setSessionTimeout(flag: boolean): void {
//     sessionTimeout = flag;
//   }

//   async function login(params: LoginParams & { goHome: boolean }) {
//     const { ...loginParams, goHome = true } = params;
//   }

//   // ! TODO 登出功能未实现
//   async function logout(goLogin = false) {}

//   return {
//     getUserInfo,
//     getSessionTimeout,
//     login,
//     logout,
//   };
// });

export function useUserStoreWithOut() {
  return useUserStore(store);
}
