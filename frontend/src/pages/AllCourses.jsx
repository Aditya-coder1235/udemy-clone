import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../components/CourseCard";

const AllCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/course/getAllCourses")
            .then((res) => setCourses(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="mt-32 text-center">Loading...</p>;

    return (
        <>
            <div className="bg-linear-to-r from-teal-300 to-teal-500 py-12 px-6 mt-15">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-700 text-center">
                    Explore Courses
                </h1>
            </div>
            <div className="mt-8 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {courses.map((course) => (
                        <CourseCard key={course._id} {...course} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default AllCourses;
