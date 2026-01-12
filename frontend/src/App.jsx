import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyCourses from "./pages/MyCourses";
import CreateCourse from "./pages/CreateCourse";
import CourseDetails from "./pages/CourseDetails";
import UpdateCourse from "./pages/UpdateCourse";
import VideoOfTheCourse from "./pages/VideoOfTheCourse";
import Unauthorized from "./pages/Unauthorized";
import ErrorPage from "./pages/ErrorPage";

import { ProtectedRoute } from "./pages/ProtectedRoute";

function App() {
    return (
        <>
            <NavBar />

            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/course/:id" element={<CourseDetails />} />
                <Route path="/video/:id" element={<VideoOfTheCourse />} />

                <Route
                    path="/mycourses"
                    element={
                        <ProtectedRoute roles={["user", "admin"]}>
                            <MyCourses />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/createCourses"
                    element={
                        <ProtectedRoute roles={["admin"]}>
                            <CreateCourse />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/update/:id"
                    element={
                        <ProtectedRoute roles={["admin"]}>
                            <UpdateCourse />
                        </ProtectedRoute>
                    }
                />

                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>

            <Footer />
        </>
    );
}

export default App;
