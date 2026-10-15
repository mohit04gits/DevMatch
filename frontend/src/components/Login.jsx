import { useState } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import { AuthStory } from "./UI";
const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(BASE_URL + "/login", { emailId, password }, { withCredentials: true });
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      const message = err?.response?.data;
      setError(typeof message === "string" ? message : message?.message || "Something went wrong. Please try again.");
    } finally { setLoading(false); }
  };
  return <main className="dm-auth dm-container"><AuthStory /><section className="dm-auth-form"><p className="dm-eyebrow">WELCOME BACK</p><h1>Pick up where you left off.</h1><p className="dm-muted">Your people. Your conversations. Your next idea.</p><form onSubmit={(event) => { event.preventDefault(); handleLogin(); }} className="dm-form" aria-busy={loading}>
    {error && <p role="alert" className="dm-alert">{error}</p>}
    <label htmlFor="login-email">Email address<input id="login-email" type="email" autoComplete="email" value={emailId} onChange={(e) => setEmailId(e.target.value)} placeholder="you@example.com" /></label>
    <label htmlFor="login-password">Password<span className="dm-password"><input id="login-password" type={visible ? "text" : "password"} autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" /><button type="button" aria-label={visible ? "Hide password" : "Show password"} aria-pressed={visible} onClick={() => setVisible(!visible)}>{visible ? <FiEyeOff /> : <FiEye />}</button></span></label>
    <button className="dm-button" disabled={loading}>{loading ? "Signing in…" : "Log in"}<FiArrowRight /></button>
  </form><p className="dm-auth-switch">New around here? <Link to="/signup">Create an account <FiArrowRight /></Link></p></section></main>;
};
export default Login;
