import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Redirect } from "wouter";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    // Check for auth token in cookies using js-cookie
    const token = Cookies.get("isAuthenticated") || Cookies.get("auth_token");
    setIsAuthenticated(!!token);
  };

  // Loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  // Render children if authenticated
  return <>{children}</>;
}
