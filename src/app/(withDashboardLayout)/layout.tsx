"use client"
import DashboardDrawer from "@/components/Dashboard/DashboardDrawer/DashboardDrawer";
import React from "react";
import { isLoggedIn } from "../services/auth.services";
import { useRouter, usePathname } from "next/navigation";

const roleBasedPrivateRoutes = {
  USER: [/^\/dashboard\/user/, /^\/dashboard\/change-password/, /^\/dashboard$/],
  ADMIN: [/^\/dashboard\/admin/, /^\/dashboard\/change-password/, /^\/dashboard$/],
  SUPER_ADMIN: [/^\/dashboard\/super-admin/],
} as const;



type Role = keyof typeof roleBasedPrivateRoutes;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const userInfo = isLoggedIn();

  if (!userInfo) {
    router.push("/login");
    return null;
  }

  const role = userInfo.role.toUpperCase() as Role;

  const isAuthorized = roleBasedPrivateRoutes[role]?.some((regex: RegExp) => regex.test(pathname));

  if (!isAuthorized) {
    router.push("/unauthorized"); // redirect to unauthorized page
    return null;
  }

  return <DashboardDrawer>{children}</DashboardDrawer>;
};

export default DashboardLayout;
