import { defineStore } from "pinia";
import { h } from "vue";
import { store } from "/@/store";
import { ErrorMessageMode } from "/#/axios";
import { UserInfo } from "/#/store";
import { GetUserInfoModel, LoginParams } from "/@/api/model/userModel";
import { loginApi, getUserInfo } from "/@/api/user";
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from "/@/enums/cacheEnum";
import { RoleEnum } from "/@/enums/roleEnum";
import { useMessage } from "/@/hooks/useMessage";
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
      return this.roleList.length > 0 ? this.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY);
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
      this.token = token ? token : "";
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
      params: LoginParams & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      }
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params;

        const data = await loginApi(loginParams, mode);
        const { token } = data;

        this.setToken(token);

        return this.afterLoginAction(goHome);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async afterLoginAction(goHome?: boolean): Promise<GetUserInfoModel | null> {
      if (!this.getToken) {
        return null;
      }

      const userInfo = await this.getUserInfoAction();

      const sessiontTimeout = this.sessionTimeout;
      if (sessiontTimeout) {
        this.setSessiontTimeout(false);
      } else {
        // ! TODO 权限及路由待处理
      }

      return userInfo;
    },
    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getToken) {
        return null;
      }

      const userInfo = await getUserInfo();

      const { roles = [] } = userInfo;
      if (Array.isArray(roles)) {
        const roleList = roles.map((item) => item.value) as RoleEnum[];
        this.setRoleList(roleList);
      } else {
        userInfo.roles = [];
        this.setRoleList([]);
      }

      this.setUserInfo(userInfo);

      return userInfo;
    },
    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          // TODO 登出方法待实现
        } catch (error) {
          console.log(error, "注销 TOKEN 失败");
        }
      }
    },
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      createConfirm({
        iconType: "warning",
        title: () => h("span", "温馨提示"),
        content: () => h("span", "是否确认退出系统？"),
        onOk: async () => {
          await this.logout(true);
        },
      });
    },
  },
});

export function useUserStoreWithOut() {
  return useUserStore(store);
}
