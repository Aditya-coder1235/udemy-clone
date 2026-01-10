import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ roles, children }) => {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    useEffect(() => {
        if (!roles.includes(role)) {
            navigate("/unauthorized", { replace: true });
        }
    }, [role, navigate, roles]);

    if (!roles.includes(role)) return null;

    return children;
};

export default ProtectedRoute;


// import React from "react";
// import { useNavigate } from "react-router-dom";

// const ProtectedRoute = ({ roles, children }) => {
//     const navigate=useNavigate()
//     const role = localStorage.getItem("role");

//     if (!roles.includes(role)) {
//         return navigate('/unauthorized', { replace: true })
//     }


//     return children;
// };

// export default ProtectedRoute;
