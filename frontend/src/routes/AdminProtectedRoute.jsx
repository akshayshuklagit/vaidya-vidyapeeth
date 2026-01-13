import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AdminProtectedRoute = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // ❌ never return null
  }

  if (!auth?.user) {
    return <Navigate to="/authpage" replace />;
  }

  if (auth.user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />; // ✅ THIS IS THE KEY
};

export default AdminProtectedRoute;
