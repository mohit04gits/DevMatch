import { useState } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("sachin@google.com");
  const [password, setPassword] = useState("Sachin@1834");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
       navigate("/");
      // navigate("/feed"); // Instead of "/"

    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0f172a] p-4">
      <div className="w-full max-w-md rounded-2xl bg-gradient-to-b from-[#121826] to-[#1f2937] shadow-2xl p-8 text-white border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        {error && (
          <div className="mb-4 text-sm text-red-500 text-center">{error}</div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter your password"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-green-700 to-green-500 hover:from-green-800 hover:to-green-600 text-white py-2 rounded-xl mt-4 font-semibold transition-all duration-300"
          >
            Login
          </button>

          <div className="text-center mt-4">
            <span className="text-sm text-gray-400">
              Don't have an account?
            </span>
            <Link
              to="/signup"
              className="ml-2 text-purple-400 hover:text-purple-200 underline font-semibold"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
