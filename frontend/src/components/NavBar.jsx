import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const NavBar = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const handleLogout = async () => {
        try {
            await axios.post(
                "http://localhost:8080/api/auth/logout",
                {},
                { withCredentials: true }
            );
            localStorage.removeItem("role");
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <header className="fixed top-0 w-full bg-white shadow z-50">
            <div className="max-w-7xl mx-auto h-18 flex items-center justify-between px-6">
                <Link to="/">
                    <img src="/logo-udemy.svg" alt="logo" className="h-8" />
                </Link>

                <input
                    placeholder="Search for anything"
                    className="hidden md:block border px-4 py-2 rounded-full w-96"
                />

                <nav className="flex gap-6 items-center">
                    <Link to="/">Home</Link>
                    {role && <Link to="/mycourses">My Courses</Link>}
                    {role === "admin" && (
                        <Link to="/createCourses">Create</Link>
                    )}

                    {!role && <Link to="/login">Login</Link>}
                    {!role && <Link to="/register">Register</Link>}

                    {role && (
                        <button
                            onClick={handleLogout}
                            className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700"
                        >
                            Logout
                        </button>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default NavBar;
