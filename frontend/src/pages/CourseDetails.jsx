import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { addToCart } from "../features/CartSlice";
import {useDispatch,useSelector} from 'react-redux'

const CourseDetails = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [rating, setrating] = useState("");
    const [comment, setComment] = useState("");
    // const[reviews,setReviews]=useState([])


    async function deleteCourse() {
        try {
            let res = await axios.delete(
                `http://localhost:8080/api/course/deleteCourse/${id}`
            );
            // console.log(res.data)
            setCourse(null);
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    }

    // useEffect(()=>{
    //     const getRatings = async () => {
    //         try {
    //             let res = await axios.get(
    //                 `http://localhost:8080/api/reviews/getById/${id}`
    //             );

    //             setReviews(res.data);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     getRatings()
    // },[id])

    useEffect(() => {
        async function fetchCourse() {
            try {
                let res = await axios.get(
                    `http://localhost:8080/api/course/getCourse/${id}`
                );
                // console.log(res.data);
                setCourse(res.data);
                setLoading(false);
            } catch (error) {
                setError("Failed to load course");
                console.log(error);
            }
        }

        fetchCourse();
    }, [id]);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    // console.log(course.reviews[0].comment)

    const addRating = async () => {
        try {
            let res = await axios.post(
                `http://localhost:8080/api/reviews/create/${id}`,
                { comment, rating }
            );
        } catch (error) {
            console.error(error);
        }
    };

    let role=localStorage.getItem('role')

    const handleUpdatePage=()=>{
        navigate(`/update/${id}`)
    }

    const imageUrl = `http://localhost:8080${course.image}`;
    return (
        <div>
            <div className="min-h-screen bg-gray-100 py-12 px-4 mt-20">
                <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={course.title}
                        className="w-full h-auto object-cover"
                    />

                    <div className="p-8 space-y-5">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                            {course.title}
                        </h1>

                        <p className="text-gray-600 leading-relaxed">
                            {course.description}
                        </p>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Price</p>
                                <h3 className="text-2xl font-bold text-purple-600">
                                    ₹{course.price}
                                </h3>
                            </div>

                            <div className="flex gap-3">
                                {role === "user" && (
                                    <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition cursor-pointer" onClick={()=>dispatch(addToCart(course))}>
                                        Enroll Now
                                    </button>
                                )}

                                {role === "admin" && (
                                    <button
                                        className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition cursor-pointer"
                                        onClick={deleteCourse}
                                    >
                                        Delete
                                    </button>
                                )}

                                {role === "admin" && (
                                    <button
                                        className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition cursor-pointer"
                                        onClick={handleUpdatePage}
                                    >
                                        Update
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="min-h-screen bg-gray-100 py-12 px-4 ">
                <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden p-10">
                    <h2 className="mb-3">Reviews</h2>
                    <Stack spacing={1}>
                        <Rating name="size-medium" defaultValue={2} />
                    </Stack>
                    <form onSubmit={addRating} className="flex flex-col gap-5 ">
                        <input
                            type="text"
                            placeholder="Enter your rating"
                            min={1}
                            max={5}
                            value={rating}
                            onChange={(e) => setrating(e.target.value)}
                            className="border rounded"
                        />
                        <textarea
                            placeholder="Enter your comments"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="border rounded h-18"
                        ></textarea>

                        <button className="border bg-blue-600 w-25 mb-5 rounded text-white">
                            Add Rating
                        </button>
                    </form>
                    <hr />
                    <h2>All reviews</h2>
                    {course.reviews[0] && (
                        <div className="bg-gray-300 w-50 p-5 rounded mt-5">
                            <p>
                                <i>@aditya</i>
                            </p>
                            <p className="text-2xl font-semibold">
                                {course.reviews[0].rating} ⭐
                            </p>
                            <p>{course.reviews[0].comment}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
