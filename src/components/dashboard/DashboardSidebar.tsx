import { getUserInfo } from "@/services/auth/getUserInfo";
import DashboardSidebarContent from "./DashboardSidebarContent";
import { getDefaultDashboardRoute } from "@/lib/route-utils"; 
import { NavSection } from "@/types/dashboard.interface";
import { getNavItemsByRole } from "@/lib/navItems.config";

const DashboardSidebar = async () => {
  const data = await getUserInfo();

  if (!data || !data.user) return null;

  const { user } = data;

  // 🔥 এখানে await দিতে হবে
  const navItems: NavSection[] = await getNavItemsByRole(user.role);

  const dashboardHome = getDefaultDashboardRoute(user.role);

  return (
    <DashboardSidebarContent
      user={user}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardSidebar;
