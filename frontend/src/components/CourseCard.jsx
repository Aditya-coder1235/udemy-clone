import React from "react";
import { useNavigate } from "react-router";

const CourseCard = ({  _id,title, description, price ,image}) => {

    const navigate=useNavigate()

     const imageUrl =  `http://localhost:8080${image}`

    return (
        <div
            onClick={() => navigate(`/course/${_id}`)}
            className="w-70 bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer"
        >
            <img
                src={imageUrl}
                alt="course"
                className="h-36 w-full object-cover"
            />

            <div className="p-4 space-y-2">
                <h4 className="text-lg font-semibold text-gray-800 line-clamp-1">
                    {title}
                </h4>

                <p className="text-sm text-gray-600 line-clamp-2">
                    {description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>@username</span>
                    <span>⭐⭐⭐⭐⭐</span>
                </div>

                <h5 className="text-lg font-bold text-blue-600">₹{price}</h5>
            </div>
        </div>
    );
};

export default CourseCard;
