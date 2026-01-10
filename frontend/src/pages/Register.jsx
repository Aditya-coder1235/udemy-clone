import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    let navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.post(
                "http://localhost:8080/api/auth/register",
                { name, email, password }
            );

            alert("User Created!");
            setName("");
            setEmail("");

            navigate("/login");
        } catch (error) {
            console.log(error.response?.data);
            alert("Error creating user");
        }
    };

    return (
        <div className="mt-20 flex justify-center items-center min-h-screen  py-10">
            <div className="w-full max-w-md  shadow-xl rounded-2xl p-8 border">
                <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
                    Create Your Account
                </h2>

                <p className="text-center  mb-8">
                    Join our learning community
                </p>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block t font-medium mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. John Doe"
                            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block  font-medium mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block  font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-700 text-white py-3 rounded-lg text-lg font-semibold hover:bg-purple-800 transition"
                    >
                        Create Account
                    </button>
                    <p className="text-center mt-4">
                        Already have an account?{" "}
                        <a
                            href="/login"
                            className="text-purple-700 font-semibold hover:underline"
                        >
                            Login
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
