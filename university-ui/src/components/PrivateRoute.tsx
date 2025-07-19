import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../auth/auth";
import type { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  return isLoggedIn() ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
