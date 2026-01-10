import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    let navigate=useNavigate()

    async function logoutUser(){
        let res = await axios.post("http://localhost:8080/api/auth/logout",{},{withCredentials:true});
    }

    const handleLogout=async()=>{
        try{
            await logoutUser()
            localStorage.removeItem('role')
            alert('you logout')
            navigate('/')


        }catch(err){
            console.error(err)
        }
    }

    const role=localStorage.getItem('role')

    return (
        <div className="flex items-center gap-20 b h-20 fixed top-0 w-full bg-white">
            <div className="ms-14">
                <a href="/">
                    <img src="/logo-udemy.svg" alt="" className="h-18 w-20" />
                </a>
            </div>
            <div>
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Search for anything"
                    className="border w-90 h-10 rounded-2xl text-center"
                />
            </div>
            <nav className="flex gap-7 ms-40">
                <Link to={"/"}>Home</Link>
                <Link to={"/mycourses"}>MyCourses</Link>
                <Link to={"/createCourses"}>CreateCourse</Link>
                {!role && <Link to={"/register"}>Register</Link>}
                {!role && <Link to={"/login"}>Login</Link>}
                {role && (
                    <button
                        onClick={handleLogout}
                        className="cursor-pointer bg-purple-600 px-2 py-1 rounded hover:bg-purple-700 transition ms-5"
                    >
                        Logout
                    </button>
                )}
            </nav>
        </div>
    );
};

export default NavBar;
