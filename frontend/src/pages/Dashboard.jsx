import React from "react";
import AllCourses from "./AllCourses";
import { useNavigate } from "react-router";

const Dashboard = () => {
    const navigate=useNavigate()

    let userId=localStorage.getItem("userId")

    // console.log(userId)

    return (
        <div>
            <div>
                <div
                    className="
            md:w-screen  md:h-screen bg-cover bg-center bg-no-repeat mt-2
            flex flex-col
           
            md:px-0
        "
                    style={{ backgroundImage: "url('/hero.png')" }}
                >
                    <h2
                        className="
                text-2xl
                mt-2
                ms-2
                font-normal
                md:relative md:top-12 md:left-20 md:text-7xl
            "
                    >
                        Master your Self, <br />
                        Anywhere <br />
                        <span className="text-2xl md:text-6xl">Anytime,</span>
                    </h2>

                    <p
                        className="
                mt-
                font-medium
                text-[8px]
                ms-2
                md:relative md:top-22 md:left-20 md:text-base
            "
                    >
                        Join thousands of learners and take your career to the
                        <br />
                        next level with our expert-led courses.
                    </p>

                    <button
                        onClick={
                            userId
                                ? () => navigate("/allCourses")
                                : () => navigate("/login")
                        }
                        className="
        mt-2
        ms-2
        w-fit
        bg-green-400
        px-3 py-2 text-sm
        rounded font-medium
        md:relative md:top-30 md:left-20 md:p-4 md:text-base
    "
                    >
                        Start Learning Now
                    </button>
                </div>
            </div>

            {/* <div className="">
                {" "}
                <div
                    className="w-screen h-screen bg-cover bg-center bg-no-repeat mt-2"
                    style={{ backgroundImage: "url('/hero.png')" }}
                >
                    {" "}
                    <h2 className="relative top-20 left-20 text-7xl font-normal">
                        {" "}
                        Master your Self, <br /> Anywhere <br />{" "}
                        <span className="text-6xl">Anytime,</span>{" "}
                    </h2>{" "}
                    <p className="relative top-30 left-20 font-medium">
                        {" "}
                        Join thousands of learners and take your career to the{" "}
                        <br /> next level with our expert-led courses.{" "}
                    </p>{" "}
                    <button
                        onClick={
                            userId
                                ? () => navigate("/allCourses")
                                : () => navigate("/login")
                        }
                        className="relative top-40 bg-green-400 p-4 rounded left-20 font-medium"
                    >
                        {" "}
                        Start Learning Now{" "}
                    </button>{" "}
                </div>{" "}
            </div> */}

            <div
                className="
        bgg py-12 px-6 mt-15
        flex flex-col
        gap-6
        md:flex-row md:gap-18
        items-center justify-center
    "
            >
                <div className="bg h-24 w-full max-w-xs md:h-30 md:w-55 rounded-xl flex justify-center items-center flex-col gap-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-green-500">
                        25k+
                    </h2>
                    <p className="font-medium text-gray-300 text-sm md:text-base">
                        CLASSES
                    </p>
                </div>

                <div className="bg h-24 w-full max-w-xs md:h-30 md:w-55 rounded-xl flex justify-center items-center flex-col gap-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-green-500">
                        600k+
                    </h2>
                    <p className="font-medium text-gray-300 text-sm md:text-base">
                        MEMBERS
                    </p>
                </div>

                <div className="bg h-24 w-full max-w-xs md:h-30 md:w-55 rounded-xl flex justify-center items-center flex-col gap-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-green-500">
                        8k+
                    </h2>
                    <p className="font-medium text-gray-300 text-sm md:text-base">
                        TEACHERS
                    </p>
                </div>

                <div className="bg h-24 w-full max-w-xs md:h-30 md:w-55 rounded-xl flex justify-center items-center flex-col gap-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-green-500">
                        4.8 star
                    </h2>
                    <p className="font-medium text-gray-300 text-sm md:text-base text-center">
                        APP STORE RATING
                    </p>
                </div>
            </div>

            <div className=" mt-10">
                <div className="flex flex-col justify-center items-center">
                    <h2 className="pt-5 text-4xl font-bold text-center">
                        Explore Inspiring Online Courses
                    </h2>
                    <AllCourses />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
