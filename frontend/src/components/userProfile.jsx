/* eslint-disable react/prop-types -- React 19 no longer runs function-component propTypes; props retain the existing API shape. */
import { useState } from "react";
const UserProfileCard = ({ user }) => {
  const {
    firstName,
    lastName,
    photoUrl,
    age,
    gender,
    about,
    skills = [],
  } = user;

  const [imageFailed, setImageFailed] = useState(false);

  const fullName = [firstName, lastName].filter(Boolean).join(" ");
  const initials = `${firstName?.[0] || "D"}${lastName?.[0] || ""}`.toUpperCase();

  return (
    <article className="dm-profile-card group w-full max-w-[360px] overflow-hidden rounded-2xl border border-white/[0.09] bg-[#11141B] text-[#F3F4F6] shadow-[0_20px_60px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/25">
      {/* Profile image */}
      <div className="relative h-[280px] overflow-hidden bg-[#191C29]">
        {photoUrl && !imageFailed ? (
          <img
            src={photoUrl}
            alt={fullName || "Developer"}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[radial-gradient(ellipse_at_center,_#29243D_0%,_#191C29_55%,_#11141B_100%)]">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-violet-300/20 bg-violet-300/[0.07] text-3xl font-semibold text-violet-200">
              {initials}
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#11141B] via-transparent to-black/10" />

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            {fullName || "Developer"}
          </h2>

          {(age || gender) && (
            <p className="mt-1.5 text-sm text-white/75">
              {[age, gender].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
      </div>

      {/* Profile details */}
      <div className="p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300">
          About
        </p>

        <p className="mt-2 min-h-[48px] break-words text-sm leading-6 text-[#A9B1C3]">
          {about || "This developer hasn't added an introduction yet."}
        </p>

        {skills.length > 0 && (
          <div className="mt-5 border-t border-white/[0.07] pt-4">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#929AAF]">
              Tech stack
            </h3>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="rounded-lg border border-white/[0.08] bg-white/[0.035] px-2.5 py-1.5 text-xs font-medium text-[#C5CCDA]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default UserProfileCard;
