import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return null;

  if (feed.length <= 0)
    return (
      <div className="flex flex-col items-center mt-24 gap-6 text-gray-300 bg-[#0e1013] min-h-screen">
        <h1 className="text-2xl font-semibold">No new user found</h1>
        <img
          className="w-60 opacity-80"
          src="https://cdn-icons-png.freepik.com/256/15052/15052692.png?semt=ais_hybrid"
          alt="No Users"
        />
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0e1013]">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
