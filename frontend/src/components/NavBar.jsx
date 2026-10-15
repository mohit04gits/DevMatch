import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
import { useState, useEffect, useRef } from "react";
import {
  FaUsers,
  FaEnvelope,
  FaCrown,
  FaSignOutAlt,
  FaChevronDown,
  FaUser,
} from "react-icons/fa";

import { Brand } from "./UI";
import { FiCompass } from "react-icons/fi";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [logoutError, setLogoutError] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );

      dispatch(removeUser());
      navigate("/login");
    } catch {
      setLogoutError("Could not log out. Please try again.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: "Discover", path: "/feed", icon: FiCompass },
    { label: "Connections", path: "/connections", icon: FaUsers },
    { label: "Requests", path: "/requests", icon: FaEnvelope },
    { label: "Premium", path: "/premium", icon: FaCrown },
  ];

  return (
    <header className="dm-app-nav fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-[#0B0D12]/95 shadow-[0_4px_24px_rgba(0,0,0,0.12)] backdrop-blur-xl">
      <nav aria-label="Main navigation" className="dm-container flex h-[76px] items-center justify-between">

        <Brand />

        {/* Desktop Navigation */}
        {user && (
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map(({ label, path, icon: Icon }) => {
              const isActive = location.pathname === path;

              return (
                <Link
                  key={path}
                  to={path}
                  aria-current={isActive ? "page" : undefined}
                  className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2.5 text-[13px] font-medium transition-colors ${
                    isActive
                      ? "bg-white/[0.07] text-white"
                      : "text-[#969DAE] hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <Icon
                    className={`text-xs ${
                      isActive
                        ? "text-violet-300"
                        : "text-[#737D91]"
                    }`}
                  />
                  {label}
                </Link>
              );
            })}
          </div>
        )}

        {!user && <Link className="dm-text-link" to="/signup">Join DevMatch</Link>}
        {/* Profile Dropdown */}
        {user && (
          <div className="relative" ref={dropdownRef} onKeyDown={(event) => { if (event.key === "Escape") { setDropdownOpen(false); dropdownRef.current?.querySelector("button")?.focus(); } }}>
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-expanded={dropdownOpen}
              aria-label="Open profile menu"
              className={`flex items-center gap-2.5 rounded-xl border px-2 py-1.5 transition-colors sm:gap-3 sm:px-3 ${
                dropdownOpen
                  ? "border-white/[0.13] bg-white/[0.06]"
                  : "border-transparent hover:border-white/[0.08] hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-white/[0.12] bg-[#211C35] text-sm font-semibold text-violet-200">
                {user.photoUrl ? (
                  <img
                    src={user.photoUrl}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  user.firstName?.[0]?.toUpperCase() || "D"
                )}
              </div>

              <span className="hidden max-w-[120px] truncate text-sm font-medium text-[#E7E9EF] sm:block">
                {user.firstName}
              </span>

              <FaChevronDown
                className={`hidden text-[10px] text-[#858DA0] transition-transform sm:block ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-60 overflow-hidden rounded-2xl border border-white/[0.09] bg-[#11141C] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                <div className="border-b border-white/[0.07] px-3 py-3">
                  <p className="truncate text-sm font-semibold text-white">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="mt-1 text-xs text-[#7F879A]">
                    Developer account
                  </p>
                </div>

                <div className="space-y-1 py-2">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#C3C9D6] transition-colors hover:bg-white/[0.05] hover:text-white"
                  >
                    <FaUser className="text-xs text-[#929AAF]" />
                    Profile
                  </Link>

                  {navLinks.map(({ label, path, icon: Icon }) => (
                    <Link
                      key={path}
                      to={path}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#C3C9D6] transition-colors hover:bg-white/[0.05] hover:text-white"
                    >
                      <Icon className="text-xs text-[#929AAF]" />
                      {label}
                    </Link>
                  ))}
                </div>

                <div className="border-t border-white/[0.07] pt-2">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-300 transition-colors hover:bg-red-400/[0.08]"
                  >
                    <FaSignOutAlt className="text-xs" />
                    Logout
                  </button>
                  {logoutError && <p role="alert" className="px-3 py-2 text-xs text-red-300">{logoutError}</p>}
                </div>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
