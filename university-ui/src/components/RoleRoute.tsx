import { Navigate } from "react-router-dom";
import { getUserInfo, isLoggedIn } from "../auth/auth";
import type { ReactNode } from "react";

interface RoleRouteProps {
  allowedRoles: string[]; 
  children: ReactNode;
}

const RoleRoute = ({ allowedRoles, children }: RoleRouteProps) => {
  if (!isLoggedIn()) return <Navigate to="/login" />;

  const user = getUserInfo();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
};

export default RoleRoute;
