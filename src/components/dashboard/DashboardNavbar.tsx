import { getUserInfo } from '@/services/auth/getUserInfo'; 
import { getDefaultDashboardRoute } from '@/lib/route-utils';
import React from 'react';
import DashboardNavbarContent from './DashboardNavbarContent';
import { getNavItemsByRole } from '@/lib/navItems.config';

const DashboardNavbar = async () => {
  const { user } = await getUserInfo();
  if (!user) return null;

  // role-based nav items
  const navItems = await getNavItemsByRole(user.role);
  const dashboardHome = getDefaultDashboardRoute(user.role);

  return (
    <DashboardNavbarContent
      user={user}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardNavbar;
