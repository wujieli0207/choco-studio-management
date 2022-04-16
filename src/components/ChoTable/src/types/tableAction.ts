import { ButtonProps, TooltipProps } from "ant-design-vue";
import { RoleEnum } from "/@/enums/roleEnum";

export interface ActionItem extends ButtonProps {
  label?: string;
  color: "success" | "error" | "warning";
  icon?: string;
  disabled?: boolean;
  divider?: boolean;
  // 权限编码控制显示
  auth?: RoleEnum | RoleEnum[] | string | string[];
  isShow?: boolean | ((action: ActionItem) => boolean);
  tooltip?: string | TooltipProps;
  onClick?: Fn;
  popConfirm?: PopConfirm;
}

export interface PopConfirm {
  title: string;
  okText?: string;
  cancelText?: string;
  confirm: Fn;
  cancel?: Fn;
  icon?: string;
  placement?:
    | "top"
    | "left"
    | "right"
    | "bottom"
    | "topLeft"
    | "topRight"
    | "leftTop"
    | "leftBottom"
    | "rightTop"
    | "rightBottom"
    | "bottomLeft"
    | "bottomRight";
}
