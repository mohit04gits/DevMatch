import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { FaCode, FaUsers } from "react-icons/fa";

import { Link } from "react-router-dom";
import { PageHeading } from "./UI";

const Feed = () => {
  const [error, setError] = useState("");
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    if (feed) return;

    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch {
      setError("We could not load developers. Please try again.");
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (error) return <main className="dm-container dm-page"><PageHeading eyebrow="DISCOVER" title="Let us try that again." /><p role="alert" className="dm-alert">{error}</p><button className="dm-button" onClick={() => { setError(""); getFeed(); }}>Try again</button></main>;

  if (!feed) {
    return (
      <main className="flex min-h-[calc(100vh-76px)] items-center justify-center bg-[#0B0D12] px-5">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04]">
            <FaCode className="animate-pulse text-xl text-violet-300" />
          </div>
          <p className="text-sm text-[#9298A7]">
            Finding developers for you...
          </p>
        </div>
      </main>
    );
  }

  if (feed.length === 0) {
    return (
      <main className="flex min-h-[calc(100vh-76px)] items-center justify-center bg-[#0B0D12] px-5 py-12">
        <section className="w-full max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-400/15 bg-violet-400/[0.07]">
            <FaUsers className="text-2xl text-violet-300" />
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
            You are all caught up
          </p>

          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-[#F3F4F6] sm:text-3xl">
            No new developers
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#9298A7]">
            You have explored everyone available for now. Check back later to
            discover more developers and grow your network.
          </p>

          <div className="mx-auto mt-7 flex w-fit items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs text-[#9298A7]">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-300" />
            More connections await
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-76px)] bg-[#0B0D12] px-4 py-8 sm:px-6 sm:py-10">
      <div className="dm-discover-layout dm-container">
        <PageHeading eyebrow="YOUR NEXT CHAPTER" title={`Good to see you${user?.firstName ? `, ${user.firstName}` : ""}.`} action={<span className="dm-count">{feed.length} to discover</span>}>A shared interest can be the start of something great.</PageHeading>

        <div className="dm-discover-grid"><section><div className="dm-section-label"><h2>Discover developers</h2><span>One connection at a time</span></div><UserCard key={feed[0]._id} user={feed[0]} /></section><aside className="dm-discover-aside"><div className="dm-panel"><p className="dm-eyebrow">MAKE A GOOD INTRODUCTION</p><h2>Be yourself.<br />Find your people.</h2><p className="dm-muted">Your profile is the start of a conversation. Share the skills and ideas you care about.</p><Link className="dm-text-link" to="/profile">Refine your profile</Link></div><div className="dm-panel"><p className="dm-eyebrow">KEEP THE CONVERSATION GOING</p><p className="dm-muted">Reconnect with the developers already in your corner.</p><Link className="dm-text-link" to="/connections">Visit your network</Link></div></aside></div>

        <p className="mt-5 text-center text-xs text-[#737D92]">
          Every great collaboration starts with a connection.
        </p>
      </div>
    </main>
  );
};

export default Feed;
