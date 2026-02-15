import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../components/CourseCard";
import { useSelector } from "react-redux";

const AllCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const searchText = useSelector((state) => state.search.searchText);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);

                const url = searchText
                    ? `https://udemy-clone-ujno.onrender.com/api/course/search?q=${searchText}`
                    : `https://udemy-clone-ujno.onrender.com/api/course/getAllCourses`;

                const res = await axios.get(url);
                setCourses(searchText ? res.data.courses : res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(fetchCourses, 400);
        return () => clearTimeout(timer);
    }, [searchText]);

    if (loading) return <p className="mt-32 text-center">Loading...</p>;

    // let user=localStorage.getItem("name")
    console.log(courses)

    return (
        <div className="pb-5">
            <h2 className="text-center text-3xl font-bold pt-10 pb-5">BROWSE COURSES</h2>
            <div className="mt-8 max-w-7xl mx-auto px-6">
                {courses.length === 0 ? (
                    <p className="text-center text-gray-500">
                        No courses found
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {courses.map((course) => (
                            <CourseCard key={course._id} {...course} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllCourses;
