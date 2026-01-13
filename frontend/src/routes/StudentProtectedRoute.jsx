import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const StudentProtectedRoute = () => {
  const { auth, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  // 🔒 Not logged in
  if (!auth || !auth.user) {
    return <Navigate to="/authpage" replace />;
  }

  // 🚫 Logged in but NOT student
  if (auth.user.role !== "student") {
    return <Navigate to="/admin" replace />;
    // return <div>UNAUTHORISED</div>;
  }

  // ✅ Logged in student
  return <Outlet />;
};

export default StudentProtectedRoute;
