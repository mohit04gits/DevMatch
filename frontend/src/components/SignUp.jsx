import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FiCode as Code2,
  FiUser as UserRound,
  FiMail as Mail,
  FiLock as LockKeyhole,
  FiCalendar as CalendarDays,
  FiUsers as Users,
  FiArrowRight as ArrowRight,
  FiLoader as LoaderCircle,
  FiCheckCircle as CheckCircle2,
  FiAlertCircle as AlertCircle,
} from "react-icons/fi";
import { BASE_URL } from "../utils/constants";

import { AuthStory } from "./UI";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [emailId, setEmailId] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !emailId.trim() ||
      !password ||
      !age ||
      !gender
    ) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${BASE_URL}/signup`,
        {
          emailId,
          password,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          age,
          gender,
        },
        { withCredentials: true }
      );

      setMessage("Account created successfully!");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/[0.09] bg-[#0c0e14] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-[#626979] hover:border-white/[0.15] focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/10";

  return (
    <main className="dm-auth dm-container dm-signup"><AuthStory />
      <div className="dm-signup-form">

        {/* Signup Card */}
        <div className="dm-auth-form">
          <div className="mb-7 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/[0.08]">
              <Code2 className="h-6 w-6 text-violet-300" />
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Create your account
            </h1>

            <p className="mt-2 text-sm leading-6 text-[#9298a7]">
              Join the community. Connect with developers.
            </p>
          </div>

          {message && (
            <div
              role="status"
              className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.07] p-3 text-sm text-emerald-300"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              {message}
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="mb-5 flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-400/[0.07] p-3 text-sm text-red-300"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-4">
            {/* Name */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-2 block text-sm font-medium text-[#D6D9E1]"
                >
                  First name
                </label>
                <div className="relative">
                  <UserRound className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#727B8F]" />
                  <input
                    id="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="mb-2 block text-sm font-medium text-[#D6D9E1]"
                >
                  Last name
                </label>
                <div className="relative">
                  <UserRound className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#727B8F]" />
                  <input
                    id="lastName"
                    type="text"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    className={inputClass}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="emailId"
                className="mb-2 block text-sm font-medium text-[#D6D9E1]"
              >
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#727B8F]" />
                <input
                  id="emailId"
                  type="email"
                  autoComplete="email"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#D6D9E1]"
              >
                Password
              </label>
              <div className="relative">
                <LockKeyhole className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#727B8F]" />
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className={inputClass}
                  required
                />
              </div>
            </div>

            {/* Age and Gender */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="age"
                  className="mb-2 block text-sm font-medium text-[#D6D9E1]"
                >
                  Age
                </label>
                <div className="relative">
                  <CalendarDays className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#727B8F]" />
                  <input
                    id="age"
                    type="number"
                    min="1"
                    max="120"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Your age"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="gender"
                  className="mb-2 block text-sm font-medium text-[#D6D9E1]"
                >
                  Gender
                </label>
                <div className="relative">
                  <Users className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#727B8F]" />
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className={`${inputClass} appearance-none`}
                    required
                  >
                    <option value="" disabled>
                      Select gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-500 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-white/[0.07] pt-5 text-center">
            <p className="text-sm text-[#9298a7]">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="font-semibold text-violet-300 transition hover:text-violet-200"
              >
                Log in
              </button>
            </p>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-[#656c7c]">
          By creating an account, you agree to use DevMatch responsibly.
        </p>
      </div>
    </main>
  );
};

export default SignUp;
