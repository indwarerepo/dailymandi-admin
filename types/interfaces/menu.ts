import { LucideIcon } from "lucide-react";
import { CommandProps } from "../layout";

export type AppMenuIconItem = {
  wId?: string;
  label: string;
  icon?: LucideIcon | string;
  to?: string;
  Bgcolor?: string;
  items?: AppMenuIconItem[];
  isWorkSpaceMenu?: boolean;
  hide?: boolean;
  command?: ({ originalEvent, item }: CommandProps) => void;
};
