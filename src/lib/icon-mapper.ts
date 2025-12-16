import {
  Home,
  LayoutDashboard,
  Compass,
  CalendarDays,
  Ticket,
  UserCircle,
  Settings,
  ShieldCheck,
  Users,
  Bell,
  CalendarCheck,
  Star
} from "lucide-react";

export const iconMap: Record<string, React.ElementType> = {
  Home,
  LayoutDashboard,
  Compass,
  CalendarDays,
  Ticket,
  UserCircle,
  Settings,
  ShieldCheck,
  Users,
  CalendarCheck,
  Star
};

export const getIconComponent = (iconName?: string) => {
  if (!iconName) return Bell;
  return iconMap[iconName] || Bell;
};
