import { defineStore } from "pinia";
import { store } from "/@/store";
import { ErrorLogInfo } from "/#/store";
import { ErrorTypeEnum } from "/@/enums/exceptionEnum";
import { RequestEnum } from "/@/enums/httpEnum";
import projectSetting from "/@/settings/projectSetting";
import { formatToDate } from "/@/utils/dateUtil";

export interface ErrorLogState {
  errorLogInfoList: Nullable<ErrorLogInfo[]>;
  errorLogListCount: number;
}

export const useErrorLogStore = defineStore({
  id: "errorLog",
  state: (): ErrorLogState => ({
    errorLogInfoList: null,
    errorLogListCount: 0,
  }),
  getters: {
    getErrorLogInfoList(): ErrorLogInfo[] {
      return this.errorLogInfoList || [];
    },
    getErrorLogListCount(): number {
      return this.errorLogListCount;
    },
  },
  actions: {
    addErrorLogInfo(info: ErrorLogInfo) {
      const item = {
        ...info,
        time: formatToDate(new Date()),
      };
      this.errorLogInfoList = [item, ...(this.errorLogInfoList || [])];
      this.errorLogListCount += 1;
    },
    addAjaxErrorInfo(error: Error | any) {
      const { useErrorHandle } = projectSetting;
      if (!useErrorHandle) {
        return;
      }

      const errInfo: Partial<ErrorLogInfo> = {
        message: error.message,
        type: ErrorTypeEnum.AJAX,
      };
      if (error.response) {
        const {
          config: {
            url = "",
            data: params = "",
            method = RequestEnum.GET,
            headers = {},
          } = {},
          data = {},
        } = error.response;
        errInfo.url = url;
        errInfo.name = "Ajaa Error!";
        errInfo.file = "-";
        errInfo.stack = JSON.stringify(data);
        errInfo.detail = JSON.stringify({ params, method, headers });
      }
      this.addErrorLogInfo(errInfo as ErrorLogInfo);
    },
  },
});

export function useErrorLogStoreWithOut() {
  return useErrorLogStore(store);
}
