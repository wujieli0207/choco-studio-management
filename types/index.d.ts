declare type EmitType = (evnet: string, ...args: any[]) => void;

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare type EmitType = (event: string, ...args: any[]) => void;

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;
