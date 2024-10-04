import { Dispatch, SetStateAction } from "react";
import { LucideIcon } from "lucide-react";

export type ChildContainerProps = {
  children: ReactNode;
};
export interface MenuContextProps {
  activeMenu: string;
  setActiveMenu: Dispatch<SetStateAction<string>>;
}

/* Context Types */
export type LayoutState = {
  menuHideState: boolean;
  menuMobileHideState: boolean;
  hoverMenuState: boolean;
};

export interface LayoutContextProps {
  layoutState: LayoutState;
  setLayoutState: Dispatch<SetStateAction<LayoutState>>;
  onMenuToggle: () => void;
  onMenuHideToggle: () => void;
  onHoverMenuToggle: () => void;
  onHoverMenuHideToggle: () => void;
}

/* AppMenu Types */
export type CommandProps = {
  originalEvent: React.MouseEvent<HTMLAnchorElement, MouseEvent>;
  item: MenuModelItem;
};

export interface MenuProps {
  model: MenuModel[];
}

export interface MenuModel {
  wId?: string;
  label: string;
  icon?: LucideIcon | string;
  items?: MenuModel[];
  Bgcolor?: string;
  to?: string;
  url?: string;
  target?: HTMLAttributeAnchorTarget;
  seperator?: boolean;
  isWorkSpaceMenu?: boolean;
  hide?: boolean;
}

export interface AppMenuItem extends MenuModel {
  items?: AppMenuItem[];
  badge?: string | number;
  badgeClass?: string;
  class?: string;
  preventExact?: boolean;
  visible?: boolean;
  disabled?: boolean;
  replaceUrl?: boolean;
  command?: ({ originalEvent, item }: CommandProps) => void;
}

//sidebar menuIcon only type

export interface MenuIconModel {
  label?: string;
  icon?: LucideIcon;
  items?: MenuModel[];
  to?: string;
  url?: string;
  target?: HTMLAttributeAnchorTarget;
  seperator?: boolean;
}

export interface AppMenuItemProps {
  item?: AppMenuItem;
  parentKey?: string;
  index?: number;
  root?: boolean;
  className?: string;
}
