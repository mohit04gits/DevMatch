// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { useDispatch } from "react-redux";
// import { removeUserFromFeed } from "../utils/feedSlice";

// const UserCard = ({ user }) => {
//   // eslint-disable-next-line react/prop-types
//   const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
//   const dispatch = useDispatch();
//   const handleSendRequest = async (status, userId) => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/request/send/" + status + "/" + userId,
//         {},
//         { withCredentials: true }
//       ); // we have to pass empty objecet as an second parameter as it is an post call chatgpt
//       dispatch(removeUserFromFeed(userId));
//     } catch (err) {
//       console.log(err.message)
//     }
//   };

//   return (
//     <div className="flex  flex-col card shadow-blue-600 bg-base-100 shadow-sm w-80 h-[500px]">
//       {/* Set fixed height for consistent display */}

//       {/* Image Section */}
//       <div className="flex-2 h-2/3">
//         {" "}
//         {/* Ensures image takes 2/3 of the card height */}
//         <img
//           className="w-full h-full object-cover rounded-t-lg"
//           src={photoUrl}
//           alt={`${firstName} ${lastName}`}
//         />
//       </div>

//       {/* Card Body */}
//       <div className="card-body flex-1 h-1/3 flex flex-col justify-between">
//         <div>
//           <h2 className="card-title">{firstName + " " + lastName}</h2>
//           {age && gender && <p>{age + " , " + gender}</p>}
//           <p className="text-sm">{about}</p>
//         </div>
//         <div className="card-actions flex justify-center mt-2">
//           <button
//             className="btn btn-primary"
//             onClick={() => handleSendRequest("ignored", _id)}
//           >
//             Ignore
//           </button>
//           <button
//             className="btn btn-secondary"
//             onClick={() => handleSendRequest("interested", _id)}
//           >
//             Interested
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserCard;

import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { FaHeart, FaTimes } from "react-icons/fa";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, about, skills = [] } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="w-[90%] max-w-sm rounded-2xl bg-gradient-to-b from-[#121826] to-[#1f2937] shadow-lg p-4 text-white border border-gray-700 relative">
      {/* Avatar */}
      <div className="relative w-full h-64 mb-4 rounded-xl overflow-hidden bg-gradient-to-b from-purple-700 to-purple-900 flex justify-center items-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="avatar"
          className="w-32 h-32 opacity-60"
        />
        <span className="absolute top-2 right-2 w-3 h-3 bg-green-400 rounded-full border border-white"></span>
        <span className="absolute bottom-2 left-2 w-3 h-3 bg-yellow-400 rounded-full border border-white"></span>
      </div>

      {/* Info */}
      <div className="mb-2">
        <div className="text-xl font-semibold capitalize">
          {firstName} <span className="font-normal">{lastName}</span>
        </div>
        {gender && age && (
          <div className="inline-flex items-center text-sm bg-purple-700 px-3 py-1 rounded-full mt-1">
            ● {gender} · {age}
          </div>
        )}
        <p className="mt-3 text-gray-300 text-sm">
          {about || "No bio available"}
        </p>
      </div>

      {/* Skills */}
      <div className="mt-4">
        <h4 className="text-sm font-semibold text-white mb-1">Skills & Tech</h4>
        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="text-xs bg-gray-700 px-2 py-1 rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm italic text-gray-400">No skills listed</p>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-between gap-4">
        <button
          className="flex-1 bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 px-4 py-2 rounded-xl flex items-center justify-center gap-2 backdrop-blur-md bg-opacity-10"
          onClick={() => handleSendRequest("ignored", _id)}
        >
          <FaTimes /> Pass
        </button>

        <button
          className="flex-1 bg-transparent border border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-all duration-200 px-4 py-2 rounded-xl flex items-center justify-center gap-2 backdrop-blur-md bg-opacity-10"
          onClick={() => handleSendRequest("interested", _id)}
        >
          <FaHeart /> Like
        </button>
      </div>
    </div>
  );
};

export default UserCard;
