import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
    const isAuthenticated = !!localStorage.getItem("userId");

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
