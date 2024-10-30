'use client';
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { userData, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !userData) {
      window.location.href = "/auth/signin"; // Redirect to login page if not authenticated
    }
  }, [userData, isLoading, ]);

  // Show loading state or content if user is authenticated
  if (isLoading || !userData) return <div>Loading...</div>;
  return <>{children}</>;
};

export default ProtectedRoute;
