import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import CreateCourse from "./pages/CreateCourse";
// import CourseDetails from "./pages/CourseDetails";
import UpdateCourse from "./pages/UpdateCourse";
import VideoOfTheCourse from "./pages/VideoOfTheCourse";
import Unauthorized from "./pages/Unauthorized";
import ErrorPage from "./pages/ErrorPage";

import { ProtectedRoute } from "./pages/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import CourseInDetail from "./pages/CourseInDetail";
import Services from "./pages/Services";
import ContactUs from "./pages/ContactUs";
import AllCourses from "./pages/AllCourses";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import AfterEnrolled from "./pages/AfterEnrolled";

function App() {
    return (
        <>
            <NavBar />

            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/service" element={<Services />} />
                <Route path="/enroll" element={<AfterEnrolled />} />

                <Route element={<ProtectedRoutes />}>
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/allCourses" element={<AllCourses />} />
                    <Route path="/course/:id" element={<CourseInDetail />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* <Route path="/course/:id" element={<CourseDetails />} /> */}

                <Route path="/video/:id" element={<VideoOfTheCourse />} />

                <Route
                    path="/mycourses"
                    element={
                        <ProtectedRoute roles={["user", "admin"]}>
                            <Cart />
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
