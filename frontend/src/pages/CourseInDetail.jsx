import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadRazorpay } from "../utils/loadRazorpay";

const CourseInDetail = () => {
    const { id } = useParams();
    const navigate=useNavigate()

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");
    const [reviews, setReviews] = useState([]);

    const fetchCourse = async () => {
        try {
            const res = await axios.get(
                `https://udemy-clone-ujno.onrender.com/api/course/getCourse/${id}`,
                { withCredentials: true },
            );
            setCourse(res.data);
            setReviews(res.data.reviews);
            setLoading(false);
        } catch (err) {
            setError("Failed to load course");
        }
    };

    useEffect(() => {
        fetchCourse();
    }, [id]);

    const addRating = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                `https://udemy-clone-ujno.onrender.com/api/reviews/create/${id}`,
                {
                    comment,
                    rating,
                },
                { withCredentials: true },
            );

            setComment("");
            setRating("");
            fetchCourse();
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    // const imageUrl = `http://localhost:8080${course.image}`;

    let userId = localStorage.getItem("userId");

    // console.log(reviews[0].user)

    const deleteReview = async (id) => {
        // e.preventDefault();

        try {
            let res = await axios.delete(
                `https://udemy-clone-ujno.onrender.com/api/reviews/delete/${id}`,
                { withCredentials: true },
            );
            // console.log(res.data)
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    //razorpay

    const handleEnroll = async () => {
        const res = await loadRazorpay();
        if (!res) {
            alert("Razorpay SDK failed");
            return;
        }

        const orderRes = await axios.post(
            "https://udemy-clone-ujno.onrender.com/api/payment/create-order",
            { courseId: course._id },
            { withCredentials: true },
        );

        const { order, key } = orderRes.data;

        const options = {
            key,
            amount: order.amount,
            currency: "INR",
            name: "Learnify",
            description: course.title,
            order_id: order.id,
            handler: async function (response) {
                await axios.post(
                    "https://udemy-clone-ujno.onrender.com/api/payment/verify-payment",
                    {
                        ...response,
                        courseId: course._id,
                    },
                    { withCredentials: true },
                );

                // alert("Enrollment Successful");
                navigate("/enroll");
            },
            theme: {
                color: "#22c55e",
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };


    return (
        <div className="pb-5 pt-2">
            <div className="min-h-screen flex flex-col md:flex-row gap-6 w-[90%] md:w-[80%] mx-auto">
                <div className="w-full md:w-[67%] md:pt-10">
                    <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-60 md:h-96 object-cover rounded"
                    />

                    <h1 className="text-2xl md:text-4xl font-bold mt-4">
                        {course.title}
                    </h1>

                    <h2 className="text-lg md:text-xl font-semibold mt-6">
                        Course Description
                    </h2>

                    <p className="text-gray-600 text-sm md:text-base">
                        {course.description}
                    </p>
                </div>

                <div className="w-full md:w-[33%] pt-4 md:pt-10">
                    <img
                        src="/ll.jpg"
                        className="w-full h-36 md:h-40 object-cover rounded"
                    />

                    <p className="mt-4 text-sm md:text-base">
                        Course Fee:
                        <span className="font-bold"> ₹{course.price}</span>
                    </p>

                    <button
                        onClick={handleEnroll}
                        className="bg-green-500 text-white px-6 py-2 mt-4 rounded"
                    >
                        Enroll Now
                    </button>
                </div>
            </div>

            <hr className="w-[90%] md:w-[80%] m-auto mt-10" />

            <div className="max-w-xl mx-auto mt-16 md:mt-22 bg-white p-4 md:p-6 rounded-xl shadow">
                <h2 className="text-lg md:text-xl font-semibold mb-4">
                    Write a Review
                </h2>

                <form onSubmit={addRating} className="space-y-4">
                    <input
                        type="number"
                        min="1"
                        max="5"
                        placeholder="Rating (1-5)"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />

                    <textarea
                        placeholder="Your review"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full border p-2 rounded"
                        rows="4"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded"
                    >
                        Submit Review
                    </button>
                </form>
            </div>

            <div className="max-w-4xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-0">
                {reviews.map((review) => (
                    <div
                        key={review._id}
                        className="border p-4 md:p-6 rounded-xl shadow-sm flex flex-col md:flex-row justify-between gap-4"
                    >
                        <div>
                            <p className="font-semibold">
                                Rating: {review.rating} ⭐
                            </p>
                            <p className="text-gray-600 mt-2">
                                {review.comment}
                            </p>
                        </div>
                        {userId === review.user && (
                            <button
                                onClick={() => deleteReview(review._id)}
                                className="w-full md:w-30 h-10 bg-black text-white py-2 rounded"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseInDetail;
