"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[] | undefined | null;
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { userData, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !userData) {
      window.location.href = "/auth/signin";
    } else if (
      allowedRoles &&
      userData?.role &&
      !allowedRoles.includes(userData.role)
    ) {
      // Jika ada userData tetapi role-nya tidak sesuai, arahkan ke dashboard
      window.location.href = "/";
    }
  }, [userData, isLoading]);

  if (
    isLoading ||
    !userData ||
    (allowedRoles && userData.role && !allowedRoles.includes(userData.role))
  ) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
