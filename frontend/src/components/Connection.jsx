/* eslint-disable react/prop-types */


import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addConnection } from "../utils/connectionSlice";
import {
  FaSearch,
  FaCommentDots,
  FaCode,
  FaUsers,
  FaArrowRight,
  FaTimes,
  FaSpinner,
  FaUserFriends,
  FaTerminal,
} from "react-icons/fa";

const SkeletonCard = () => (
  <div className="animate-pulse rounded-2xl border border-white/[0.07] bg-[#11141B] p-5 sm:p-6">
    <div className="flex items-center gap-4">
      <div className="h-14 w-14 shrink-0 rounded-2xl bg-white/[0.07]" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-32 max-w-full rounded bg-white/[0.07]" />
        <div className="h-3 w-24 rounded bg-white/[0.04]" />
      </div>
    </div>
    <div className="mt-6 h-3 w-full rounded bg-white/[0.05]" />
    <div className="mt-2 h-3 w-3/4 rounded bg-white/[0.05]" />
    <div className="mt-6 h-10 rounded-xl bg-white/[0.05]" />
  </div>
);

const getInitials = (firstName, lastName) =>
  `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase() || "D";

const ConnectionCard = ({ connection }) => {
  const {
    _id,
    firstName,
    lastName,
    photoUrl,
    age,
    gender,
    about,
    skills = [],
  } = connection;

  const [imageFailed, setImageFailed] = useState(false);
  const fullName = [firstName, lastName].filter(Boolean).join(" ");

  return (
    <article className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#11141B] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/25 hover:bg-[#131722] hover:shadow-[0_16px_45px_rgba(0,0,0,0.2)] sm:p-6">
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Developer information */}
      <div className="flex items-start gap-3">
        <div className="relative shrink-0">
          <div className="flex h-[58px] w-[58px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#211C35] text-lg font-semibold text-violet-200 ring-4 ring-white/[0.02]">
            {photoUrl && !imageFailed ? (
              <img
                src={photoUrl}
                alt={fullName || "Developer"}
                className="h-full w-full object-cover"
                onError={() => setImageFailed(true)}
              />
            ) : (
              getInitials(firstName, lastName)
            )}
          </div>
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <h2 className="truncate text-[15px] font-semibold tracking-tight text-[#F2F3FA] transition-colors group-hover:text-violet-200">
            {fullName || "Developer"}
          </h2>

          <p className="mt-1.5 truncate text-xs text-[#8D95A9]">
            {[age, gender].filter(Boolean).join(" · ") || "Developer"}
          </p>
        </div>

        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/15 bg-emerald-400/[0.07] px-2.5 py-1.5 text-[10px] font-medium text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Connected
        </span>
      </div>

      {/* About */}
      <div className="mt-6 min-h-[66px]">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#737D94]">
          About
        </p>

        <p className="line-clamp-2 break-words text-[13px] leading-6 text-[#B1B8C9]">
          {about || "This developer hasn't added an introduction yet."}
        </p>
      </div>

      {/* Skills */}
      <div className="mt-5 border-t border-white/[0.06] pt-4">
        <div className="mb-3 flex items-center gap-2">
          <FaCode className="text-[11px] text-violet-300" />
          <span className="text-xs font-medium text-[#A9B0C2]">
            Tech stack
          </span>
        </div>

        {skills.length > 0 ? (
          <div className="flex min-h-[28px] flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                className="max-w-full truncate rounded-lg border border-white/[0.08] bg-white/[0.035] px-2.5 py-1.5 text-[11px] font-medium text-[#C4CBDA] transition-colors group-hover:border-violet-300/15"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="min-h-[28px] text-xs text-[#737D92]">
            No skills listed
          </p>
        )}
      </div>

      {/* Existing chat navigation */}
      <Link
        to={`/chat/${_id}`}
        className="mt-6 flex h-11 items-center gap-3 rounded-xl border border-violet-400/20 bg-violet-500/[0.08] px-4 text-sm font-medium text-violet-200 transition-all duration-200 hover:border-violet-400/40 hover:bg-violet-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-400/50"
      >
        <FaCommentDots className="text-sm" />
        <span>Message</span>
        <FaArrowRight className="ml-auto text-xs opacity-60 transition-transform group-hover:translate-x-1" />
      </Link>
    </article>
  );
};

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchConnections = async () => {
      try {
        setError("");

        const res = await axios.get(`${BASE_URL}/user/connections`, {
          withCredentials: true,
        });

        if (!cancelled) {
          dispatch(addConnection(res.data.data));
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Error fetching connections:", err);
          setError("We couldn't load your network. Please try again.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchConnections();

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  const filteredConnections = useMemo(() => {
    const list = Array.isArray(connections) ? connections : [];
    const query = search.trim().toLowerCase();

    if (!query) return list;

    return list.filter((person) => {
      const name = `${person.firstName || ""} ${person.lastName || ""}`;
      const about = person.about || "";
      const skills = (person.skills || []).join(" ");

      return `${name} ${about} ${skills}`.toLowerCase().includes(query);
    });
  }, [connections, search]);

  return (
    <main className="dm-list-page min-h-[calc(100vh-76px)] bg-[#0B0D12] px-4 pb-16 pt-8 text-[#F3F4F6] sm:px-6 sm:pt-10 lg:px-10">
      <div className="dm-container">
        {/* Page header */}
        <header className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#10131B] px-5 py-7 sm:px-8 sm:py-8">
          <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-violet-600/[0.07] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 right-1/3 h-48 w-48 rounded-full bg-indigo-500/[0.04] blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/15 bg-violet-400/[0.06] px-3 py-1.5 text-[11px] font-medium tracking-wide text-violet-200">
                <FaTerminal className="text-[10px]" />
                YOUR DEVELOPER NETWORK
              </div>

              <h1 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                Connections
              </h1>

              <p className="mt-3 max-w-lg text-sm leading-6 text-[#929AAF] sm:text-[15px]">
                Great things are built together. Stay connected with the
                developers in your network.
              </p>
            </div>

            {!loading && !error && (
              <div className="flex items-center gap-4 self-start rounded-2xl border border-white/[0.08] bg-[#171A25]/80 px-5 py-4 sm:self-auto">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-500/10 text-violet-200">
                  <FaUserFriends className="text-lg" />
                </div>

                <div>
                  <p className="text-2xl font-semibold leading-7 tracking-tight text-white">
                    {Array.isArray(connections) ? connections.length : 0}
                  </p>
                  <p className="mt-1 text-xs text-[#8D95A9]">
                    Connections
                  </p>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Search */}
        {!loading &&
          !error &&
          Array.isArray(connections) &&
          connections.length > 0 && (
            <section className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-sm font-medium text-[#E3E6EF]">
                  Your network
                </h2>
                <p className="mt-1 text-xs text-[#7D869B]">
                  {filteredConnections.length}{" "}
                  {filteredConnections.length === 1
                    ? "developer"
                    : "developers"}
                  {search.trim() ? " found" : " in your network"}
                </p>
              </div>

              <div className="relative w-full sm:max-w-sm">
                <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#737D92]" />

                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search people, skills..."
                  aria-label="Search connections"
                  className="h-12 w-full rounded-xl border border-white/[0.09] bg-[#11141B] pl-10 pr-10 text-sm text-white outline-none transition placeholder:text-[#687187] hover:border-white/[0.14] focus:border-violet-400/50 focus:ring-4 focus:ring-violet-500/[0.07]"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#929AAF] transition hover:bg-white/[0.06] hover:text-white"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            </section>
          )}

        {/* Loading state */}
        {loading ? (
          <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : error ? (
          /* Error state */
          <div className="mx-auto mt-12 max-w-lg rounded-2xl border border-red-400/15 bg-[#11141B] px-6 py-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-400/10 text-red-300">
              <FaUsers />
            </div>

            <p className="mt-4 text-base font-medium text-white">{error}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-violet-400/20 bg-violet-500/10 px-5 py-2.5 text-sm font-medium text-violet-200 transition hover:bg-violet-500 hover:text-white"
            >
              <FaSpinner />
              Reload page
            </button>
          </div>
        ) : connections.length === 0 ? (
          /* Empty network state */
          <div className="mx-auto flex max-w-lg flex-col items-center py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-400/15 bg-violet-500/[0.08] text-2xl text-violet-200">
              <FaUsers />
            </div>

            <h2 className="mt-6 text-xl font-semibold tracking-tight text-white">
              Your network starts here
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-[#929AAF]">
              Discover developers, find people who share your interests, and
              start building meaningful connections.
            </p>

            <Link
              to="/feed"
              className="mt-6 inline-flex h-11 items-center gap-3 rounded-xl bg-violet-400 px-5 text-sm font-semibold text-[#111018] transition hover:bg-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400/50"
            >
              Discover developers
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
        ) : filteredConnections.length === 0 ? (
          /* Search empty state */
          <div className="py-20 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-[#11141B] text-[#929AAF]">
              <FaSearch />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-white">
              No matching developers
            </h2>

            <p className="mt-2 text-sm text-[#929AAF]">
              Try another name, skill, or keyword.
            </p>

            <button
              type="button"
              onClick={() => setSearch("")}
              className="mt-4 text-sm font-medium text-violet-300 transition hover:text-violet-200"
            >
              Clear search
            </button>
          </div>
        ) : (
          /* Connection cards */
          <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredConnections.map((connection) => (
              <ConnectionCard
                key={connection._id}
                connection={connection}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Connections;
