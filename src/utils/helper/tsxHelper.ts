import { Slots } from "vue";
import { isFunction } from "/@/utils/is";

export function getSlot(slots: Slots, slot = "default", data?: unknown) {
  if (!slots || !Reflect.has(slots, slot)) {
    return null;
  }
  if (!isFunction(slots[slot])) {
    console.error(`${slot} 不是一个 Function`);
    return null;
  }

  const slotFn = slots[slot];
  if (!slotFn) {
    return null;
  }
  return slotFn(data);
}

export function extendSlots(slots: Slots, excludeKeys: string[] = []) {
  const slotKeys = Object.keys(slots);
  const ret: any = {};
  slotKeys.map((key) => {
    if (excludeKeys.includes(key)) {
      return null;
    }
    ret[key] = () => getSlot(slots, key);
  });
}
