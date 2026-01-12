import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ roles, children }) => {
    const role = localStorage.getItem("role");

    if (!role) {
        return <Navigate to="/login" replace />;
    }

    if (!roles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};
