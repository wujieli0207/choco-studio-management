export interface AppointConfig {
  startTimeHour: string; // 课程预约开始小时
  endTimeHour: string; // 课程预约结束小时
  minuteSelect: string[]; // 可选择的分钟数
}

export interface GlobConfig {
  title: string;
  shortName: string;
  apiUrl: string;
  urlPrefix?: string;
  uploadUrl?: string;
}

export interface GlobEnvConfig {
  VITE_GLOB_APP_TITLE: string;
  VITE_GLOB_APP_SHORT_NAME: string;
  VITE_GLOB_API_URL: string;
  VITE_GLOB_API_URL_PREFIX?: string;
  VITE_GLOB_UPLOAD_URL?: string;
}
