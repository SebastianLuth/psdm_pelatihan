"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[] | undefined | null;
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { userData, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !userData) {
      router.replace("/auth/signin"); 
    } else if (
      allowedRoles &&
      userData?.role &&
      !allowedRoles.includes(userData.role)
    ) {
      router.replace("/"); 
    }
  }, [userData, isLoading, allowedRoles, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userData || (allowedRoles && userData.role && !allowedRoles.includes(userData.role))) {
    return null; // 
  }

  return <>{children}</>;
};

export default ProtectedRoute;
