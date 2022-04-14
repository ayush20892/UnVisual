import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../context/authContext";
import { Children } from "./types";

export function PrivateRoute({ children }: Children) {
  const { authState } = useAuth();
  let location = useLocation();
  return authState.userId ? (
    children
  ) : (
    <Navigate state={{ from: location }} replace to="/user/login" />
  );
}
