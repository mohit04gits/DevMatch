import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
import { useState, useEffect, useRef } from "react";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 w-full bg-base-100 shadow-md z-50">
      <nav className="max-w-7xl mx-auto px-6 sm:px-10 py-4 flex justify-between items-center">
        {/* Brand Logo at Left */}
        <Link
          to="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent select-none"
        >
          DevMatch
        </Link>

        {/* Only show user section if user is logged in */}
        {user && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-3 rounded-full border-2 border-base-300 hover:border-primary transition px-3 py-1 cursor-pointer select-none"
            >
              <img
                src={user.photoUrl}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="hidden sm:inline font-semibold text-base-content">
                {user.firstName}
              </span>
              <svg
                className={`w-4 h-4 ml-1 text-base-content transition-transform ${
                  dropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-base-100 border border-base-300 rounded-lg shadow-lg py-2 text-base-content z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-primary hover:text-primary-content transition rounded-md font-medium flex justify-between items-center"
                >
                  Profile
                  <span className="text-xs bg-primary text-primary-content rounded-full px-2 py-0.5 ml-2 select-none">
                    New
                  </span>
                </Link>
                <Link
                  to="/requests"
                  className="block px-4 py-2 hover:bg-primary hover:text-primary-content transition rounded-md font-medium"
                >
                  Requests
                </Link>
                <Link
                  to="/connections"
                  className="block px-4 py-2 hover:bg-primary hover:text-primary-content transition rounded-md font-medium"
                >
                  Connections
                </Link>
                <Link
                  to="/premium"
                  className="block px-4 py-2 hover:bg-primary hover:text-primary-content transition rounded-md font-medium"
                >
                  Premium
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 transition rounded-md font-medium"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
