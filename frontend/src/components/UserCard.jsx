/* eslint-disable react/prop-types -- React 19 no longer runs function-component propTypes; props retain the existing API shape. */
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import {
  FaUserPlus,
  FaTimes,
  FaCode,
  FaSpinner,
} from "react-icons/fa";

const UserCard = ({ user }) => {
  const {
    _id,
    firstName,
    lastName,
    age,
    gender,
    about,
    skills = [],
    photoUrl,
  } = user;

  const dispatch = useDispatch();
  const [loadingAction, setLoadingAction] = useState("");
  const [error, setError] = useState("");
  const [imageFailed, setImageFailed] = useState(false);

  const fullName = [firstName, lastName].filter(Boolean).join(" ");
  const initials = `${firstName?.[0] || "D"}${lastName?.[0] || ""}`.toUpperCase();

  const handleSendRequest = async (status) => {
    if (loadingAction) return;

    setLoadingAction(status);
    setError("");

    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoadingAction("");
    }
  };

  return (
    <article className="dm-developer-card group w-full max-w-[430px] overflow-hidden rounded-2xl border border-white/[0.09] bg-[#11141B] text-[#F3F4F6] shadow-[0_20px_70px_rgba(0,0,0,0.22)] transition-colors duration-300 hover:border-white/[0.14]">
      {/* Profile image */}
      <div className="relative h-[280px] overflow-hidden bg-[#181C27] sm:h-[320px]">
        {photoUrl && !imageFailed ? (
          <img
            src={photoUrl}
            alt={`${fullName || "Developer"}'s profile`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(ellipse_at_center,_#29243D_0%,_#191C29_48%,_#11141B_100%)]">
            <div className="flex h-24 w-24 items-center justify-center rounded-[28px] border border-violet-300/20 bg-violet-300/[0.07] text-3xl font-semibold tracking-tight text-violet-200">
              {initials}
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#11141B] via-black/10 to-black/20" />

        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-[#0B0D12]/70 px-3 py-1.5 text-xs font-medium text-[#E6E9F2] backdrop-blur-md">
          <FaCode className="text-violet-300" />
          Developer
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-[28px]">
            {fullName || "Developer"}
          </h2>

          {(age || gender) && (
            <p className="mt-1.5 text-sm text-white/75">
              {[age, gender].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="p-5 sm:p-6">
        <section>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-300">
            About
          </p>

          <p className="mt-2 min-h-[48px] whitespace-pre-line break-words text-sm leading-6 text-[#A9B1C3]">
            {about || "This developer hasn't added an introduction yet."}
          </p>
        </section>

        <section className="mt-6 border-t border-white/[0.07] pt-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold text-[#E6E9F2]">
              Tech stack
            </h3>
            <span className="text-xs text-[#737D92]">
              {skills.length} {skills.length === 1 ? "skill" : "skills"}
            </span>
          </div>

          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="rounded-lg border border-white/[0.08] bg-white/[0.035] px-2.5 py-1.5 text-xs font-medium text-[#C5CCDA] transition-colors hover:border-violet-300/25 hover:text-violet-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#737D92]">
              No skills added yet.
            </p>
          )}
        </section>

        {error && (
          <p
            role="alert"
            className="mt-5 rounded-xl border border-red-400/20 bg-red-400/[0.07] px-3.5 py-3 text-sm leading-5 text-red-300"
          >
            {error}
          </p>
        )}

        {/* Existing request actions */}
        <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/[0.07] pt-5">
          <button
            type="button"
            disabled={Boolean(loadingAction)}
            onClick={() => handleSendRequest("ignored")}
            className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.11] bg-transparent text-sm font-medium text-[#B7BECC] transition-colors hover:border-red-300/30 hover:bg-red-400/[0.07] hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loadingAction === "ignored" ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <FaTimes />
            )}
            Skip
          </button>

          <button
            type="button"
            disabled={Boolean(loadingAction)}
            onClick={() => handleSendRequest("interested")}
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-400 px-4 text-sm font-semibold text-[#111018] transition-colors hover:bg-violet-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loadingAction === "interested" ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <FaUserPlus />
            )}
            Connect
          </button>
        </div>
      </div>
    </article>
  );
};

export default UserCard;
