import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouterProps {
  element?: any;
  status?: boolean;
}

export default function ProtectedRouter({
  element,
  status = true,
}: ProtectedRouterProps) {
  console.log("o ben protec", status);
  if (!status) {
    return <Navigate to="/" replace />;
  }

  return <>{element}</>;
}
