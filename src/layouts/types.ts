export interface SideBarItem {
  index: string;
  title: string;
  icon?: string;
  subs?: SideBarItem[];
}
