import { ErrorMessageMode } from "/#/axios";
import { SessionTimeoutProcessingEnum } from "/@/enums/appEnum";
import projectSetting from "/@/settings/projectSetting";
import { useUserStoreWithOut } from "/@/store/modules/user";

const stp = projectSetting.sessionTimeoutProcessing;

export function checkStatus(
  status: number,
  msg: string,
  errorMessageMode: ErrorMessageMode = "message"
): void {
  const userStore = useUserStoreWithOut();
  let errMessage = "";

  switch (status) {
    case 400:
      errMessage = `${msg}`;
      break;
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      userStore.setToken(undefined);
      errMessage = msg || "用户没有权限（令牌、用户名、密码错误）！";
      if (stp === SessionTimeoutProcessingEnum.PAGE_COVERAGE) {
        userStore.setSessionTimeout(true);
      } else {
        userStore.logout(true);
      }
      break;
    case 403:
      errMessage = "用户得到授权，但访问是被禁止的！";
      break;
    case 404:
      errMessage = "网络请求错误，未找到该资源";
      break;
    case 405:
      errMessage = "网络请求错误，请求方法未允许！";
      break;
    case 408:
      errMessage = "网络请求超时！";
      break;
    case 500:
      errMessage = "服务器错误，请联系管理员！";
      break;
    case 501:
      errMessage = "网络未实现！";
      break;
    case 502:
      errMessage = "网络错误！";
      break;
    case 503:
      errMessage = "服务不可用，服务器暂时过载或维护！";
      break;
    case 504:
      errMessage = "网络超时！";
      break;
    case 505:
      errMessage = "http版本不支持该请求！";
      break;
    default:
  }

  if (errMessage) {
    // TODO 弹窗提示
    // if (errorMessageMode === "modal") {
    //   createErrorModal({ title: "错误提示", content: errMessage });
    // }
    // if (errorMessageMode === "message") {
    //   createMessage.error({
    //     content: errMessage,
    //     key: `请求错误状态${status}`,
    //   });
    // }
  }
}
