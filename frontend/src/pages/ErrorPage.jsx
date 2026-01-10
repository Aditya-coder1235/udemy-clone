import React from "react";
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="mt-45 mb-80 text-center">
            <h1 className="text-4xl font-bold text-red-500">
                404 - Page Not Found
            </h1>
            <p className="mt-4">The page you are looking for does not exist.</p>

            <NavLink to="/" className="text-black-600 underline mt-4 block ">
                Go Back Home
            </NavLink>
        </div>
    );
};

export default ErrorPage;
