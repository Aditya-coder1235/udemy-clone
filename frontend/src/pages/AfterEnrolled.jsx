import React from "react";
import { useNavigate } from "react-router-dom";

const AfterEnrolled = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12 max-w-md w-full text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-green-600 mb-4">
                    Congratulations!
                </h1>

                <p className="text-gray-600 text-sm md:text-base mb-6">
                    You have successfully enrolled in the course. Start learning
                    and upgrade your skills today.
                </p>

                <button
                    onClick={() => navigate("/mycourses")}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                    Go to My Courses
                </button>
            </div>
        </div>
    );
};

export default AfterEnrolled;
