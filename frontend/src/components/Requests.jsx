import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchReq = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/recieved`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log("ERROR:" + err.message);
    }
  };

  useEffect(() => {
    fetchReq();
  }, []);

  if (!requests) return null;

  if (requests.length === 0)
    return (
      <div className="mt-24 flex flex-col justify-center items-center px-4 mt-24">
        <h1 className="text-xl md:text-2xl font-semibold text-white mb-6">
          No Requests Found
        </h1>
        <div className="w-56 md:w-72">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            fill="none"
            className="w-full h-auto"
          >
            <circle cx="100" cy="100" r="100" fill="#1f2937" />
            <path
              d="M60 80a10 10 0 1 1 20 0M120 80a10 10 0 1 1 20 0"
              stroke="#9CA3AF"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M70 130c10 10 50 10 60 0"
              stroke="#D1D5DB"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    );

  return (
    <div className="text-center mt-24 px-4">
      <h1 className="font-bold text-white my-10 text-3xl">Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="flex flex-col md:flex-row justify-between items-center gap-4 m-2 p-4 rounded-2xl bg-base-300 w-full sm:w-10/12 lg:w-2/3 xl:w-1/2 mx-auto shadow-lg"
          >
            <div className="flex flex-col sm:flex-row items-center text-left gap-4">
              <img
                alt="user"
                className="w-20 h-20 rounded-full object-cover"
                src={photoUrl}
              />
              <div>
                <h2 className="font-bold text-xl text-white">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && (
                  <p className="text-gray-300">{age + ", " + gender}</p>
                )}
                <p className="text-gray-400">{about}</p>
              </div>
            </div>

            <div className="flex gap-2 flex-col sm:flex-row">
              <button
                className="btn btn-error text-white"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-success text-white"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
