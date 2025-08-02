// import { useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { useNavigate } from "react-router-dom";
// const SignUp = () => {
//   // ✅ State for form inputs
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailId, setEmailId] = useState("");

//   // ✅ State for Messages & Errors
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const handleSignUp = async () => {
//     try {
//       const res = await axios.post(
//         `${BASE_URL}/signup`,
//         { emailId, password, firstName, lastName },
//         { withCredentials: true }
//       );
//       setMessage("Successfully Signed Up! 🎉");
//       setError(""); 


//       // ✅ Remove message after 3 seconds
//       setTimeout(() => setMessage(""), 3000);
//     } catch (err) {
//       setError("Signup failed! ❌");
//       setMessage(""); // Clear success message

//       // ✅ Remove error after 3 seconds
//       setTimeout(() => setError(""), 3000);
//     }
//   };

//   return (
//     <div className="my-20 p-2 flex justify-center mt-[10%]">
//       <div className="card bg-base-300 w-96 shadow-xl p-5">
//         <h2 className="text-center text-2xl font-bold">Sign Up</h2>

//         {/* toast notification type */}
//         {message && (
//           <div className="alert alert-success mt-3 shadow-lg">
//             <span>{message}</span>
//           </div>
//         )}

//         {/* ❌ Error Toast - DaisyUI Alert */}
//         {error && (
//           <div className="alert alert-error mt-3 shadow-lg">
//             <span>{error}</span>
//           </div>
//         )}

//         <div className="flex flex-col gap-3 mt-4">
//           <input
//             type="email"
//             value={emailId}
//             placeholder="Email"
//             onChange={(e) => setEmailId(e.target.value)}
//             className="input input-bordered w-full"
//             required
//           />
//           <input
//             type="password"
//             value={password}
//             placeholder="Password"
//             onChange={(e) => setPassword(e.target.value)}
//             className="input input-bordered w-full"
//             required
//           />
//           <input
//             type="text"
//             value={firstName}
//             placeholder="First Name"
//             onChange={(e) => setFirstName(e.target.value)}
//             className="input input-bordered w-full"
//             required
//           />
//           <input
//             type="text"
//             value={lastName}
//             placeholder="Last Name"
//             onChange={(e) => setLastName(e.target.value)}
//             className="input input-bordered w-full"
//             required
//           />
//           <button className="btn btn-primary mt-4" onClick={handleSignUp}>
//             Sign Up
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [emailId, setEmailId] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        { emailId, password, firstName, lastName, age, gender },
        { withCredentials: true }
      );
      setMessage("Successfully Signed Up! 🎉");
      setError("");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError("Signup failed! ❌");
      setMessage("");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0f172a] p-4">
      <div className="w-full max-w-md rounded-2xl bg-gradient-to-b from-[#121826] to-[#1f2937] shadow-2xl p-8 text-white border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>

        {/* ✅ Success Toast */}
        {message && (
          <div className="mb-4 text-sm text-green-400 text-center">{message}</div>
        )}

        {/* ❌ Error Toast */}
        {error && (
          <div className="mb-4 text-sm text-red-400 text-center">{error}</div>
        )}

        <div className="space-y-4">
          <input
            type="email"
            value={emailId}
            placeholder="Email"
            onChange={(e) => setEmailId(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
          <input
            type="text"
            value={firstName}
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
          <input
            type="text"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
          <input
            type="number"
            value={age}
            placeholder="Age"
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
          <select
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option disabled value="">Select Gender</option>
            <option>male</option>
            <option>female</option>
            <option>others</option>
          </select>

          <button
            onClick={handleSignUp}
            className="w-full bg-gradient-to-r from-green-700 to-green-500 hover:from-green-800 hover:to-green-600 text-white py-2 rounded-xl mt-4 font-semibold transition-all duration-300"
          >
            Sign Up
          </button>

          <div className="text-center mt-4">
            <span className="text-sm text-gray-400">
              Already have an account?
            </span>
            <button
              onClick={() => navigate("/login")}
              className="ml-2 text-purple-400 hover:text-purple-200 underline font-semibold"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
