import React from 'react'
import axios from 'axios';
import { useParams } from 'react-router';
import { useState,useEffect } from 'react';

const VideoOfTheCourse = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchCourse() {
            try {
                let res = await axios.get(
                    `https://udemy-clone-ujno.onrender.com/api/course/getCourse/${id}`,
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

    const videoUrl = `http://localhost:8080${course.video}`;
    return (
        <div>
            <div className="min-h-screen bg-gray-100 py-12 px-4 mt-20">
                <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                    
                    <video src={videoUrl} controls ></video>

                    <div className="p-8 space-y-5">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                            {course.title}
                        </h1>

                        <p className="text-gray-600 leading-relaxed">
                            {course.description}
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
};


export default VideoOfTheCourse