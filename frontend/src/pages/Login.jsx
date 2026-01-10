import {useState} from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Login = () => {

  let navigate=useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.post(
                "http://localhost:8080/api/auth/login",
                { email, password },{withCredentials:true}
            );

            alert("User Login!");
            localStorage.setItem("role", res.data.user.role);
            setEmail("");
            setPassword('')

            navigate('/')

          


        } catch (error) {
            console.log(error.response?.data);
            alert("Error login user");
        }
    };

    return (
       
            <div className="mt-20 flex justify-center items-center min-h-screen bg-gray-100 py-10">
                <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border">
                    <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
                        Welcome Back
                    </h2>

                    <p className="text-center text-gray-500 mb-8">
                        Continue your learning journey
                    </p>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Email Address
                            </label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Password
                            </label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-purple-700 text-white py-3 rounded-lg text-lg font-semibold hover:bg-purple-800 transition"
                        >
                            Login
                        </button>

                        <p className="text-center text-gray-600 mt-4">
                            Don't have an account?{" "}
                            <a
                                href="/register"
                                className="text-purple-700 font-semibold hover:underline"
                            >
                                Register
                            </a>
                        </p>
                    </form>
                </div>
            </div>
    );
};


export default Login;
