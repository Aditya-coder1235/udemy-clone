import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ _id, title, description, price, image }) => {
    const navigate = useNavigate();
    const imageUrl = `http://localhost:8080${image}`;

    return (
        <div
            onClick={() => navigate(`/course/${_id}`)}
            className="bg-white rounded-xl shadow hover:shadow-xl transition cursor-pointer overflow-hidden
                       w-full sm:w-60 h-auto sm:h-60"
        >
            <img
                src={imageUrl}
                alt={title}
                className="h-40 sm:h-35 w-full object-cover"
            />

            <div className="p-3 space-y-2">
                <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>

                <p className="text-sm text-gray-600 line-clamp-2">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default CourseCard;
