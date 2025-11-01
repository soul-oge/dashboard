import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function RequireAdmin({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Chargement...</p>;

  if (!user || user.status !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
