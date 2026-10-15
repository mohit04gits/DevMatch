/* eslint-disable react/prop-types -- React 19 no longer runs function-component propTypes; props retain the existing API shape. */
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import {
  FaUsers,
  FaCode,
  FaCheck,
  FaTimes,
  FaSpinner,
  FaInbox,
  FaArrowRight,
} from "react-icons/fa";

const RequestSkeleton = () => (
  <div className="animate-pulse rounded-2xl border border-white/[0.07] bg-[#11141B] p-5">
    <div className="flex items-center gap-4">
      <div className="h-16 w-16 rounded-2xl bg-white/[0.07]" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-36 max-w-full rounded bg-white/[0.07]" />
        <div className="h-3 w-24 rounded bg-white/[0.04]" />
      </div>
    </div>
    <div className="mt-5 h-3 w-full rounded bg-white/[0.05]" />
    <div className="mt-2 h-3 w-3/4 rounded bg-white/[0.05]" />
    <div className="mt-5 h-10 rounded-xl bg-white/[0.05]" />
  </div>
);

const getInitials = (firstName, lastName) =>
  `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase() || "D";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [error, setError] = useState("");

  const reviewRequest = async (status, id) => {
    if (processingId) return;

    setProcessingId(id);
    setError("");

    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(id));
    } catch (err) {
      console.error("Error reviewing request:", err);
      setError(
        err.response?.data?.message ||
          "Couldn't update this request. Please try again."
      );
    } finally {
      setProcessingId(null);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const fetchReq = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/requests/recieved`, {
          withCredentials: true,
        });

        if (!cancelled) {
          dispatch(addRequests(res.data.data));
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Error fetching requests:", err);
          setError("We couldn't load your requests. Please try again.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchReq();

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  const validRequests = Array.isArray(requests)
    ? requests.filter((req) => req?.fromUserId)
    : [];

  return (
    <main className="dm-list-page min-h-[calc(100vh-76px)] bg-[#0B0D12] px-4 pb-16 pt-8 text-[#F3F4F6] sm:px-6 sm:pt-10 lg:px-10">
      <div className="dm-container">
        {/* Header */}
        <header className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#10131B] px-5 py-7 sm:px-8 sm:py-8">
          <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-violet-600/[0.07] blur-3xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/15 bg-violet-400/[0.06] px-3 py-1.5 text-[11px] font-medium tracking-wide text-violet-200">
                <FaCode className="text-[10px]" />
                YOUR NEXT CONNECTION
              </div>

              <h1 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                Connection requests
              </h1>

              <p className="mt-3 max-w-lg text-sm leading-6 text-[#929AAF] sm:text-[15px]">
                Meet developers who want to connect and build something
                meaningful with you.
              </p>
            </div>

            {!loading && !error && (
              <div className="flex w-fit items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#171A25]/80 px-4 py-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-500/10 text-violet-200">
                  <FaInbox />
                </div>

                <div>
                  <p className="text-xl font-semibold leading-6 text-white">
                    {validRequests.length}
                  </p>
                  <p className="mt-1 text-xs text-[#8D95A9]">
                    Pending requests
                  </p>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Loading */}
        {loading ? (
          <section
            aria-label="Loading requests"
            className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2"
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <RequestSkeleton key={index} />
            ))}
          </section>
        ) : error ? (
          /* Error state */
          <section className="mx-auto mt-10 max-w-lg rounded-2xl border border-red-400/15 bg-[#11141B] px-6 py-10 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-400/10 text-red-300">
              <FaInbox />
            </div>

            <p className="mt-4 text-sm leading-6 text-[#E5A6A6]">{error}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl border border-white/[0.1] px-4 text-sm font-medium text-[#E6E9F2] transition hover:bg-white/[0.05]"
            >
              <FaSpinner />
              Reload page
            </button>
          </section>
        ) : validRequests.length === 0 ? (
          /* Empty state */
          <section className="mx-auto flex max-w-lg flex-col items-center py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-400/15 bg-violet-500/[0.08] text-2xl text-violet-200">
              <FaUsers />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
              All caught up
            </p>

            <h2 className="mt-3 text-xl font-semibold tracking-tight text-white sm:text-2xl">
              No pending requests
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-[#929AAF]">
              When developers want to connect with you, their requests will
              show up here. Keep discovering people in your community.
            </p>

            <a
              href="/feed"
              className="mt-6 inline-flex h-11 items-center gap-3 rounded-xl bg-violet-400 px-5 text-sm font-semibold text-[#111018] transition hover:bg-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400/50"
            >
              Discover developers
              <FaArrowRight className="text-xs" />
            </a>
          </section>
        ) : (
          /* Requests list */
          <section className="mt-8">
            <div className="mb-5">
              <h2 className="text-sm font-medium text-[#E3E6EF]">
                People who want to connect
              </h2>
              <p className="mt-1 text-xs text-[#7D869B]">
                Review each profile and choose whether to connect.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {validRequests.map((request) => {
                const person = request.fromUserId;
                const {
                  _id: userId,
                  firstName,
                  lastName,
                  photoUrl,
                  age,
                  gender,
                  about,
                  skills = [],
                } = person;

                const fullName = [firstName, lastName]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <RequestCard
                    key={request._id}
                    requestId={request._id}
                    person={{
                      userId,
                      firstName,
                      lastName,
                      photoUrl,
                      age,
                      gender,
                      about,
                      skills,
                      fullName,
                    }}
                    processing={processingId === request._id}
                    anyProcessing={Boolean(processingId)}
                    onReview={reviewRequest}
                  />
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

const RequestCard = ({
  requestId,
  person,
  processing,
  anyProcessing,
  onReview,
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  const {
    firstName,
    lastName,
    photoUrl,
    age,
    gender,
    about,
    skills = [],
    fullName,
  } = person;

  return (
    <article className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#11141B] p-5 transition-all duration-300 hover:border-violet-400/25 hover:bg-[#131722] sm:p-6">
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="flex items-start gap-4">
        <div className="flex h-[68px] w-[68px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#211C35] text-xl font-semibold text-violet-200">
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

        <div className="min-w-0 flex-1 pt-1">
          <h3 className="truncate text-base font-semibold tracking-tight text-[#F2F3FA]">
            {fullName || "Developer"}
          </h3>

          {(age || gender) && (
            <p className="mt-1.5 text-xs text-[#8D95A9]">
              {[age, gender].filter(Boolean).join(" · ")}
            </p>
          )}

          <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-violet-400/15 bg-violet-400/[0.06] px-2.5 py-1 text-[10px] font-medium text-violet-200">
            <FaUsers className="text-[9px]" />
            Wants to connect
          </span>
        </div>
      </div>

      <div className="mt-5 min-h-[66px]">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#737D94]">
          About
        </p>
        <p className="line-clamp-3 break-words text-[13px] leading-6 text-[#B1B8C9]">
          {about || "This developer hasn't added an introduction yet."}
        </p>
      </div>

      <div className="mt-5 border-t border-white/[0.06] pt-4">
        <div className="mb-3 flex items-center gap-2">
          <FaCode className="text-[11px] text-violet-300" />
          <span className="text-xs font-medium text-[#A9B0C2]">
            Tech stack
          </span>
        </div>

        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                className="max-w-full truncate rounded-lg border border-white/[0.08] bg-white/[0.035] px-2.5 py-1.5 text-[11px] font-medium text-[#C4CBDA]"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[#737D92]">No skills listed</p>
        )}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/[0.06] pt-5">
        <button
          type="button"
          disabled={anyProcessing}
          onClick={() => onReview("rejected", requestId)}
          className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-transparent px-3 text-sm font-medium text-[#B7BECC] transition hover:border-red-300/30 hover:bg-red-400/[0.07] hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {processing ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <FaTimes />
          )}
          Reject
        </button>

        <button
          type="button"
          disabled={anyProcessing}
          onClick={() => onReview("accepted", requestId)}
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-400 px-3 text-sm font-semibold text-[#111018] transition hover:bg-violet-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {processing ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <FaCheck />
          )}
          Accept
        </button>
      </div>
    </article>
  );
};

export default Requests;
