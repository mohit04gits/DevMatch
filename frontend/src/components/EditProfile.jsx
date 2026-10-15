/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import {
  FaUser,
  FaCamera,
  FaCode,
  FaSave,
  FaSpinner,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const fieldClass =
  "mt-2 h-12 w-full rounded-xl border border-white/[0.09] bg-[#0B0D12] px-4 text-sm text-[#F3F4F6] outline-none transition placeholder:text-[#626B7F] hover:border-white/[0.14] focus:border-violet-400/50 focus:ring-4 focus:ring-violet-500/[0.07]";

const labelClass =
  "block text-sm font-medium text-[#C5CCDA]";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [skills, setSkills] = useState(user?.skills?.join(", ") || "");
  const [age, setAge] = useState(user?.age || "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imageFailed, setImageFailed] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await axios.put(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender: gender.toLowerCase(),
          about,
          photoUrl,
          skills: skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      dispatch(addUser(res?.data?.data));
      setSuccess("Profile saved successfully!");
    } catch (err) {
      const responseMessage = err.response?.data?.message;

      setError(
        typeof responseMessage === "string"
          ? responseMessage
          : typeof err.response?.data === "string"
            ? err.response.data
            : "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const displayName =
    [firstName, lastName].filter(Boolean).join(" ") || "Your name";

  return (
    <div className="dm-edit-profile w-full text-[#F3F4F6]">
      <form onSubmit={saveProfile}>
        {/* Form header */}
        <div className="flex flex-col gap-5 border-b border-white/[0.07] pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-violet-300">
              <FaUser className="text-xs" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
                Account settings
              </span>
            </div>

            <h2 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Edit your profile
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#9298A7]">
              Keep your information current so developers can get to know you.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-400 px-5 text-sm font-semibold text-[#111018] transition hover:bg-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400/50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <FaSave />
            )}
            {loading ? "Saving changes..." : "Save changes"}
          </button>
        </div>

        <div className="space-y-8 py-7">
          {/* Profile preview and photo URL */}
          <section>
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-[#E6E9F2]">
                Profile photo
              </h3>
              <p className="mt-1 text-xs leading-5 text-[#7D869B]">
                Add a publicly accessible image URL for your profile.
              </p>
            </div>

            <div className="flex flex-col gap-5 rounded-2xl border border-white/[0.07] bg-white/[0.015] p-4 sm:flex-row sm:items-center sm:p-5">
              <div className="flex shrink-0 items-center gap-4">
                <div className="flex h-[76px] w-[76px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#211C35] text-2xl font-semibold text-violet-200">
                  {photoUrl && !imageFailed ? (
                    <img
                      src={photoUrl}
                      alt={displayName}
                      className="h-full w-full object-cover"
                      onError={() => setImageFailed(true)}
                    />
                  ) : (
                    `${firstName?.[0] || "D"}${lastName?.[0] || ""}`.toUpperCase()
                  )}
                </div>

                <div className="min-w-0 sm:hidden">
                  <p className="truncate text-sm font-semibold text-white">
                    {displayName}
                  </p>
                  <p className="mt-1 text-xs text-[#9298A7]">
                    Profile preview
                  </p>
                </div>
              </div>

              <label className="min-w-0 flex-1">
                <span className={labelClass}>
                  <FaCamera className="mr-2 inline text-xs text-violet-300" />
                  Photo URL
                </span>
                <input
                  value={photoUrl}
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  className={fieldClass}
                  onChange={(e) => {
                    setPhotoUrl(e.target.value);
                    setImageFailed(false);
                  }}
                />
                <span className="mt-2 block text-xs leading-5 text-[#737D92]">
                  Use a direct link to an image.
                </span>
              </label>
            </div>
          </section>

          {/* Personal details */}
          <section>
            <div className="mb-5 flex items-center gap-3 border-b border-white/[0.07] pb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-500/[0.08] text-violet-200">
                <FaUser className="text-sm" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#E6E9F2]">
                  Personal details
                </h3>
                <p className="mt-1 text-xs text-[#7D869B]">
                  The basics about you
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
              <label className={labelClass}>
                First name
                <input
                  value={firstName}
                  type="text"
                  autoComplete="given-name"
                  placeholder="First name"
                  className={fieldClass}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>

              <label className={labelClass}>
                Last name
                <input
                  value={lastName}
                  type="text"
                  autoComplete="family-name"
                  placeholder="Last name"
                  className={fieldClass}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>

              <label className={labelClass}>
                Age
                <input
                  value={age}
                  type="number"
                  min="18"
                  max="120"
                  placeholder="Your age"
                  className={fieldClass}
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>

              <label className={labelClass}>
                Gender
                <select
                  value={gender}
                  className={`${fieldClass} appearance-none`}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="male" className="bg-[#11141B]">
                    Male
                  </option>
                  <option value="female" className="bg-[#11141B]">
                    Female
                  </option>
                  <option value="others" className="bg-[#11141B]">
                    Others
                  </option>
                </select>
              </label>
            </div>
          </section>

          {/* About */}
          <section>
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-[#E6E9F2]">
                About you
              </h3>
              <p className="mt-1 text-xs leading-5 text-[#7D869B]">
                Tell other developers what you do and what you enjoy building.
              </p>
            </div>

            <label className="block">
              <span className={labelClass}>Introduction</span>
              <textarea
                value={about}
                rows={5}
                placeholder="I'm a developer who enjoys building..."
                className="mt-2 w-full resize-y rounded-xl border border-white/[0.09] bg-[#0B0D12] px-4 py-3 text-sm leading-6 text-[#F3F4F6] outline-none transition placeholder:text-[#626B7F] hover:border-white/[0.14] focus:border-violet-400/50 focus:ring-4 focus:ring-violet-500/[0.07]"
                onChange={(e) => setAbout(e.target.value)}
              />
            </label>
          </section>

          {/* Skills */}
          <section>
            <div className="mb-4 flex items-center gap-3 border-b border-white/[0.07] pb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-500/[0.08] text-violet-200">
                <FaCode className="text-sm" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#E6E9F2]">
                  Skills & technologies
                </h3>
                <p className="mt-1 text-xs text-[#7D869B]">
                  Help others discover your tech stack
                </p>
              </div>
            </div>

            <label className="block">
              <span className={labelClass}>Your skills</span>
              <input
                type="text"
                value={skills}
                className={fieldClass}
                placeholder="JavaScript, React, Node.js"
                onChange={(e) => setSkills(e.target.value)}
              />
              <span className="mt-2 block text-xs leading-5 text-[#737D92]">
                Separate each skill with a comma.
              </span>
            </label>

            {skills.trim() && (
              <div className="mt-4 flex flex-wrap gap-2">
                {skills
                  .split(",")
                  .map((skill) => skill.trim())
                  .filter(Boolean)
                  .map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-lg border border-white/[0.08] bg-white/[0.035] px-2.5 py-1.5 text-xs font-medium text-[#C5CCDA]"
                    >
                      {skill}
                    </span>
                  ))}
              </div>
            )}
          </section>

          {/* Save feedback */}
          {(error || success) && (
            <div
              role={error ? "alert" : "status"}
              className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm leading-5 ${
                error
                  ? "border-red-400/20 bg-red-400/[0.06] text-red-300"
                  : "border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-300"
              }`}
            >
              {error ? (
                <FaExclamationCircle className="mt-0.5 shrink-0" />
              ) : (
                <FaCheckCircle className="mt-0.5 shrink-0" />
              )}
              <p>{error || success}</p>
            </div>
          )}
        </div>

        {/* Bottom action */}
        <div className="flex flex-col gap-3 border-t border-white/[0.07] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-[#737D92]">
            Changes appear on your profile after you save.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-400 px-5 text-sm font-semibold text-[#111018] transition hover:bg-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400/50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <FaSave />
            )}
            {loading ? "Saving..." : "Save profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
