import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../features/searchSlice";
import { Search } from "lucide-react";
import { ShoppingCart } from "lucide-react";

const NavBar = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const dispatch = useDispatch();
    const searchText = useSelector((state) => state.search.searchText);

    const handleLogout = async () => {
        try {
            await axios.post(
                "http://localhost:8080/api/auth/logout",
                {},
                { withCredentials: true },
            );
            localStorage.clear();
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <header className="top-0 w-full bg-white shadow z-50">
            <div className="max-w-7xl mx-auto flex  md:flex-row items-center gap-12 md:gap-30 px-4 md:px-6 py-3 md:py-0">
                {/* Logo */}
                <Link to="/">
                    <img
                        src="/logo-udemy.png"
                        alt="logo"
                        className="h-14  md:inline-block md:h-19"
                    />
                </Link>

                <div className="relative w-full md:w-auto hidden md:inline-block">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 bg-green-500 rounded-full h-8 w-8 flex justify-center items-center text-white md:left-86 md:top-5 md:h-10 md:w-10 cursor-pointer">
                        <Search size={16} />
                    </div>
                    <input
                        placeholder="What do you want to learn today?"
                        className="w-full md:w-96 h-10 pl-12 md:pl-4 pr-4 border rounded-full md:block"
                        value={searchText}
                        onChange={(e) =>
                            dispatch(setSearchText(e.target.value))
                        }
                    />
                </div>

                <nav
                    className="
    flex 
    flex-nowrap 
    md:flex-wrap 
    justify-start 
    md:justify-center 
    gap-3
    md:gap-9 
    items-center 
    overflow-x-auto 
    whitespace-nowrap
    md:items-center
"
                >
                    <Link
                        to="/"
                        className="shrink-0 text-[10px] md:text-[18px]"
                    >
                        Home
                    </Link>
                    <Link
                        to="/service"
                        className="shrink-0 text-[10px] md:text-[18px]"
                    >
                        Services
                    </Link>
                    <Link
                        to="/contact"
                        className="shrink-0 text-[10px] md:text-[18px]"
                    >
                        Contact Us
                    </Link>

                    {role && (
                        <Link
                            to="/mycourses"
                            className="shrink-0 text-[10px] md:text-[18px]"
                        >
                            {/* <ShoppingCart className="h-5" /> */}
                            My Learning
                        </Link>
                    )}

                    {role === "admin" && (
                        <Link
                            to="/createCourses"
                            className="shrink-0 text-[10px] md:text-[18px]"
                        >
                            Upload
                        </Link>
                    )}

                    {!role && (
                        <Link
                            to="/login"
                            className="shrink-0 text-[10px] md:text-[18px]"
                        >
                            Login
                        </Link>
                    )}
                    {!role && (
                        <Link
                            to="/register"
                            className="shrink-0 text-[10px] md:text-[18px]"
                        >
                            Register
                        </Link>
                    )}

                    {role && (
                        <button
                            onClick={handleLogout}
                            className="shrink-0 px-1 py-  bg-green-500 text-white md:px-4 md:py-1 rounded hover:bg-green-700"
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
