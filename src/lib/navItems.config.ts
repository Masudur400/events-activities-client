import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./route-utils";

/* =====================================================
   COMMON NAV ITEMS (ALL ROLES)
===================================================== */
export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);

  return [
    {
      items: [
        {
          title: "Home",
          href: "/",
          icon: "Home",
          roles: ["USER", "HOST", "SUPER_ADMIN"],
        },
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
          roles: ["USER", "HOST", "SUPER_ADMIN"],
        },
      ],
    },
    // {
    //   title: "Account",
    //   items: [
    //     {
    //       title: "Reset Password",
    //       href: "/reset-password",
    //       icon: "Settings",
    //       roles: ["USER", "HOST", "SUPER_ADMIN"],
    //     },
    //   ],
    // },
  ];
};

/* =====================================================
   USER NAV
===================================================== */
export const getUserNavItems = async (): Promise<NavSection[]> => {
  return [
    {
      title: "User",
      items: [
        {
          title: "My Booked Events",
          href: "/dashboard/my-book-events",
          icon: "Ticket",
          roles: ["USER"],
        },
        {
          title: "Profile",
          href: "/dashboard/profile",
          icon: "UserCircle",
          roles: ["USER"],
        },
      ],
    },
  ];
};

/* =====================================================
   HOST NAV
===================================================== */
export const getHostNavItems = async (): Promise<NavSection[]> => {
  return [
    {
      title: "Host",
      items: [
        {
          title: "Explore Events",
          href: "/host/dashboard/explore-events",
          icon: "Compass",
          roles: ["HOST"],
        },
        {
          title: "My Events",
          href: "/host/dashboard/my-events",
          icon: "CalendarDays",
          roles: ["HOST"],
        },
        {
          title: "Manage Bookings",
          href: "/host/dashboard/manage-bookings",
          icon: "CalendarDays",
          roles: ["HOST"],
        },
        {
          title: "Profile",
          href: "/host/dashboard/profile",
          icon: "UserCircle",
          roles: ["HOST"],
        },
      ],
    },
  ];
};

/* =====================================================
   SUPER ADMIN NAV
===================================================== */
export const adminNavItems: NavSection[] = [
  {
    title: "Admin",
    items: [
      {
        title: "Manage Events",
        href: "/admin/dashboard/manage-events",
        icon: "ShieldCheck",
        roles: ["SUPER_ADMIN"],
      },
      {
        title: "Manage Bookings",
        href: "/admin/dashboard/manage-bookings",
        icon: "CalendarDays",
        roles: ["SUPER_ADMIN"],
      },
      {
        title: "Manage Hosts",
        href: "/admin/dashboard/manage-hosts",
        icon: "Users",
        roles: ["SUPER_ADMIN"],
      },
      {
        title: "Manage Users",
        href: "/admin/dashboard/manage-users",
        icon: "Users",
        roles: ["SUPER_ADMIN"],
      },
      {
        title: "Manage Reviews",
        href: "/admin/dashboard/manage-reviews",
        icon: "Star",
        roles: ["SUPER_ADMIN"],
      },
      {
        title: "Profile",
        href: "/admin/dashboard/profile",
        icon: "UserCircle",
        roles: ["SUPER_ADMIN"],
      },
    ],
  },
];

/* =====================================================
   FINAL ROLE BASED NAV MERGER
===================================================== */
export const getNavItemsByRole = async (
  role: UserRole
): Promise<NavSection[]> => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case "SUPER_ADMIN":
      return [...commonNavItems, ...adminNavItems];

    case "HOST":
      return [...commonNavItems, ...(await getHostNavItems())];

    case "USER":
      return [...commonNavItems, ...(await getUserNavItems())];

    default:
      return [];
  }
};
