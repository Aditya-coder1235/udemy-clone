import React, { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import axios from "axios";

const AllCourses = () => {
    const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAllCourses();
    }, []);

    async function fetchAllCourses() {
        try {
            let res = await axios.get(
                "http://localhost:8080/api/course/getAllCourses"
            );

            setCourse(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    if (loading) {
        return <h2>Loading courses...</h2>;
    }

    return (
        <>
            <div className="bg-linear-to-r from-teal-300 to-teal-500 py-12 px-6 mt-15">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-700 text-center">
                    Explore All Courses
                </h1>
                <p className="text-gray-600 text-center mt-2">
                    Learn new skills and upgrade your career
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {course.map((course) => (
                        <CourseCard
                            key={course._id}
                            title={course.title}
                            description={course.description}
                            price={course.price}
                            image={course.image}
                            _id={course._id}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default AllCourses;
