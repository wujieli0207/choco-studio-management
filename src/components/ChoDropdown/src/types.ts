export interface DropMenu {
  text: string;
  event: string | number;
  disabled?: boolean;
  divider?: boolean;
  icon?: string;
  to?: string;
  onClick?: Fn;
}
