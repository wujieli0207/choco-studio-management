import { BasicColumn } from "/@/components/ChoTable/src/types/table";
import { Ref, ref, onMounted } from "vue";
import { AppointManageTableItem } from "../types";
import { getAppointList } from "/@/api/appoint";

const useAppointManage = () => {
  const columns: BasicColumn[] = [
    {
      title: "序号",
      dataIndex: "appointId",
      width: 100,
    },
    {
      title: "预约标题",
      dataIndex: "appointTitle",
      width: 100,
    },
    {
      title: "预约图片",
      dataIndex: "appointImg",
      width: 100,
      slots: { customRender: "img" },
    },
    {
      title: "金额",
      dataIndex: "appointAmt",
    },
    {
      title: "描述",
      dataIndex: "appointDesc",
    },
    {
      title: "开始时间",
      dataIndex: "appointStartTime",
    },
    {
      title: "结束时间",
      dataIndex: "appointEndTime",
    },
    {
      title: "操作",
      dataIndex: "操作",
    },
  ];

  const data: Ref<AppointManageTableItem[]> = ref([]);

  onMounted(() => {
    loadAppointList();
  });

  async function loadAppointList() {
    const result = await getAppointList();
    data.value = result.list;
  }

  return { columns, data };
};

export default useAppointManage;
