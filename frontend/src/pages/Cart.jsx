import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
    const [course, setCourse] = useState([]);

    let userId = localStorage.getItem("userId");

    async function fetchUser() {
        try {
            let res = await axios.get(
                `http://localhost:8080/api/user/enrolledCourse/${userId}`,
                { withCredentials: true },
            );
            setCourse(res.data.user.buyCourses);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    if (course.length === 0) {
        return (
            <h3 className="text-center mt-20 text-xl font-semibold">
                No Course Enrolled!
            </h3>
        );
    }

    return (
        <div className="w-[90%] md:w-[80%] mx-auto mt-10">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
                My Enrolled Courses
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {course.map((course) => {
                    return (
                        <div
                            key={course._id}
                            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                        >
                            <img
                                src={`http://localhost:8080${course.image}`}
                                alt=""
                                className="w-full h-40 md:h-48 object-cover"
                            />

                            <div className="p-4">
                                <h2 className="text-lg md:text-xl font-semibold">
                                    {course.title}
                                </h2>

                                <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                                    {course.description}
                                </p>

                                <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-md text-sm md:text-base">
                                    Continue Learning
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Cart;
