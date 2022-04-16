export interface Appoint {
  appointId: string;
  appointTitle: string;
  appointDesc: string;
  appointImg: string;
  appointAmt: string | number;
  appointStartTime: string;
  appointEndTime: string;
}

export interface AppointListRo {
  list: Appoint[];
  count: number;
}
