import { Badge } from "../ui/badge";
import { Bell } from "lucide-react";

const Notification = () => {
  return (
    <div className="relative cursor-pointer">
      <Bell className="text-topbarForeground w-5 h-5" />
      <Badge className="absolute -top-3.5 -right-2 bg-inherit p-0 w-[1.2rem] h-[1.2rem] border border-topbarForeground text-xs font-normal text-topbarForeground hover:bg-inherit flex items-center justify-center">
        2
      </Badge>
    </div>
  );
};

export default Notification;
