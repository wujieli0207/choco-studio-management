import type { ModalFunc, ModalFuncProps } from "ant-design-vue/lib/modal/Modal";
import { InfoCircleFilled } from "@ant-design/icons-vue";
import { isString } from "/@/utils/is";
import { Modal, notification, message as Message } from "ant-design-vue";

export declare type NotificationPlacement = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
export declare type IconType = "success" | "info" | "error" | "warning";
export interface ModalOptionEx extends Omit<ModalFuncProps, "iconType"> {
  iconType: IconType;
}

export type ModalOptionsPartial = Partial<ModalOptionEx> & Pick<ModalOptionEx, "content">;

interface ConfirmOptions {
  info: ModalFunc;
  success: ModalFunc;
  error: ModalFunc;
  warn: ModalFunc;
  warning: ModalFunc;
}

function getIcon(iconType: string) {
  if (iconType === "warning") {
    return <InfoCircleFilled class="modal-icon-warning" />;
  }
  if (iconType === "success") {
    return <InfoCircleFilled class="modal-icon-success" />;
  }
  if (iconType === "info") {
    return <InfoCircleFilled class="modal-icon-info" />;
  }
  return <InfoCircleFilled class="modal-icon-error" />;
}

function renderContent({ content }: Pick<ModalOptionEx, "content">) {
  if (isString(content)) {
    return <div innerHTML={`<div>${content}</div>`}></div>;
  } else {
    return content;
  }
}

const getBasicOptions = () => {
  return {
    okText: "确认",
    centered: true,
  };
};

function createConfirm(options: ModalOptionEx): ConfirmOptions {
  const iconType = options.iconType || "warning";
  Reflect.deleteProperty(options, "iconType");
  const opt: ModalFuncProps = {
    centered: true,
    icon: getIcon(iconType),
    ...options,
    content: renderContent(options),
  };
  return Modal.confirm(opt) as unknown as ConfirmOptions;
}

function createModalOptions(options: ModalOptionsPartial, icon: string): ModalOptionsPartial {
  return {
    ...getBasicOptions(),
    ...options,
    content: renderContent(options),
    icon: getIcon(icon),
  };
}

function createSuccessModal(options: ModalOptionsPartial) {
  return Modal.success(createModalOptions(options, "success"));
}
function createErrorModal(options: ModalOptionsPartial) {
  return Modal.error(createModalOptions(options, "error"));
}
function createInfoModal(options: ModalOptionsPartial) {
  return Modal.info(createModalOptions(options, "info"));
}
function createWarningModal(options: ModalOptionsPartial) {
  return Modal.warning(createModalOptions(options, "warning"));
}

notification.config({
  placement: "topRight",
  duration: 3,
});

export function useMessage() {
  return {
    createMessage: Message,
    notification: notification,
    createConfirm,
    createSuccessModal,
    createErrorModal,
    createInfoModal,
    createWarningModal,
  };
}
