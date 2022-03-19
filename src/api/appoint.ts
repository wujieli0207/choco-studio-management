import { AppointListRo } from "./model/appointModel";
import { defHttp } from "/@/utils/http/axios";

enum Api {
  APPOINT_LIST = "/appoint/findAll",
}

export const getAppointList = () => {
  return defHttp.get<AppointListRo>({ url: Api.APPOINT_LIST });
};
