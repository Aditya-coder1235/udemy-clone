import {useState} from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Login = () => {

  let navigate=useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const[error,setError]=useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.post(
                "https://udemy-clone-ujno.onrender.com/api/auth/login",
                { email, password },
                { withCredentials: true },
            );
            console.log(res.data)

            // alert("User Login!");
            localStorage.setItem("role", res.data.user.role);
            localStorage.setItem("userId", res.data.user.id);
            localStorage.setItem("name", res.data.user.name);

            setEmail("");
            setPassword('')

            navigate('/')

          


        } catch (error) {
            console.log(error.response?.data);
            setError(error.response?.data.message);
            // alert("Error login user");
        }
    };

    console.log(error)

    return (
        <div className="flex flex-col md:flex-row min-h-screen py-10 justify-center items-center gap-6">
            {/* className="w-50 max-w-md bg-white shadow-xl rounded-2xl p-8 border" */}
            <div className="h-auto md:h-120 p-5 w-full max-w-md md:w-100">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-green-700 mb-4 md:mb-6">
                    Welcome Back
                </h2>

                <p className="text-center text-gray-500 mb-6 md:mb-8 text-sm md:text-base">
                    Continue your learning journey
                </p>

                <form
                    className="space-y-4 md:space-y-5"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <label className="block text-gray-700 font-medium mb-1 text-sm md:text-base">
                            Email Address
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="you@example.com"
                            className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1 text-sm md:text-base">
                            Password
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-red-600 font-normal text-sm">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-green-700 text-white py-2 md:py-3 rounded-lg text-base md:text-lg font-semibold hover:bg-green-800 transition"
                    >
                        Login
                    </button>

                    <p className="text-center text-gray-600 mt-4 text-sm md:text-base">
                        Don't have an account?{" "}
                        <a
                            href="/register"
                            className="text-green-700 font-semibold hover:underline"
                        >
                            Register
                        </a>
                    </p>
                </form>
            </div>

            {/* className="w-50 max-w-md bg-white shadow-xl " */}
            <div className=" md:block">
                <img src="/class.png" alt="" className="h-120 w-100" />
            </div>
        </div>
    );
};


export default Login;
