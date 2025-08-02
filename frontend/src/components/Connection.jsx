// /* eslint-disable react/prop-types */
// import  { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { BASE_URL } from "../utils/constants";
// import { addConnection } from "../utils/connectionSlice";

// /**
//  * Skeleton Card Component
//  * Displays a placeholder UI that mimics the layout of the connection card.
//  * This provides a better user experience while data is being fetched.
//  */
// const SkeletonCard = () => (
//   <div className="bg-base-200 p-4 rounded-xl shadow-md animate-pulse">
//     <div className="flex flex-col items-center gap-4">
//       <div className="bg-base-300 w-24 h-24 rounded-full"></div>
//       <div className="w-3/4 h-6 bg-base-300 rounded"></div>
//       <div className="w-1/2 h-4 bg-base-300 rounded"></div>
//     </div>
//     <div className="mt-6 h-10 bg-base-300 rounded-lg"></div>
//   </div>
// );


// /**
//  * Connection Card Component
//  * A dedicated component to display a single user connection.
//  * This keeps the code organized and reusable.
//  */
// const ConnectionCard = ({ connection }) => {
//   const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;

//   return (
//     <div
//       key={_id}
//       className="bg-base-200 p-4 rounded-xl shadow-md transition-transform duration-300 hover:-translate-y-1 flex flex-col text-center"
//     >
//       {/* Profile Info */}
//       <div className="flex-grow">
//         <img
//           alt={`${firstName} ${lastName}`}
//           className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-base-100 mx-auto -mt-12"
//           src={photoUrl || `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`}
//           onError={(e) => { e.target.onerror = null; e.target.src=`https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`}}
//         />
//         <h2 className="font-bold text-xl mt-4">
//           {firstName} {lastName}
//         </h2>
//         {age && gender && (
//           <p className="text-sm text-base-content/70">{age}, {gender}</p>
//         )}
//         <p className="text-base-content/80 text-sm mt-2 px-2 line-clamp-2 h-10">
//           {about}
//         </p>
//       </div>

//       {/* Action Button */}
//       <div className="mt-6">
//         <Link
//           to={`/chat/${_id}`}
//           className="btn btn-primary w-full"
//         >
//           Chat
//         </Link>
//       </div>
//     </div>
//   );
// };


// /**
//  * Main Connections Component
//  */
// const Connections = () => {
//   const connections = useSelector((store) => store.connections);
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // If connections are already in the store, don't fetch again.
//     // Set loading to false immediately.
//     if (connections && connections.length > 0) {
//       setLoading(false);
//       return;
//     }

//     const fetchConnections = async () => {
//       try {
//         const res = await axios.get(BASE_URL + "/user/connections", {
//           withCredentials: true,
//         });
//         dispatch(addConnection(res.data.data));
//       } catch (err) {
//         console.error("Error fetching connections:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchConnections();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [dispatch]);

//   // Loading State with Skeleton UI
//   if (loading) {
//     return (
//       <div className="bg-base-100 min-h-screen p-4 sm:p-8">
//         <div className="max-w-6xl mx-auto">
//           <div className="h-8 w-1/3 bg-base-300 rounded animate-pulse mb-8"></div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mt-16">
//             {/* Display 8 skeleton cards while loading */}
//             {Array.from({ length: 8 }).map((_, index) => (
//               <SkeletonCard key={index} />
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Empty State
//   if (!connections || connections.length === 0) {
//     return (
//       <div className="my-24 p-4 flex flex-col gap-6 justify-center items-center text-center">
//          <svg className="w-20 h-20 text-base-content/30" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m-7.5-2.962A3.375 3.375 0 0 1 9 12.25c0-1.03.394-1.983 1.054-2.723A3.375 3.375 0 0 1 12.25 9c1.03 0 1.983.394 2.723 1.054A3.375 3.375 0 0 1 15.75 12.25c0 1.03-.394 1.983-1.054 2.723A3.375 3.375 0 0 1 12.25 15.75c-1.03 0-1.983-.394-2.723-1.054ZM12 3.75a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z" />
//         </svg>
//         <h1 className="text-2xl font-semibold text-base-content">
//           No Connections Found
//         </h1>
//         <p className="text-base-content/70 max-w-sm">
//           It looks like you haven't made any connections yet. Go out and find some!
//         </p>
//       </div>
//     );
//   }

//   // Main Content
//   return (
//     <div className="bg-base-100 min-h-screen p-4 sm:p-8">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold text-base-content mb-2">
//           Your Connections
//         </h1>
//         <p className="text-base-content/70">
//           You currently have {connections.length} connection{connections.length !== 1 && 's'}.
//         </p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mt-16">
//           {connections.map((connection) => (
//             <ConnectionCard key={connection._id} connection={connection} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Connections;






/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addConnection } from "../utils/connectionSlice";

const SkeletonCard = () => (
  <div className="bg-gray-700 p-6 rounded-2xl shadow-lg animate-pulse flex flex-col items-center space-y-4">
    <div className="w-24 h-24 bg-gray-600 rounded-full"></div>
    <div className="w-3/4 h-6 bg-gray-600 rounded"></div>
    <div className="w-1/2 h-4 bg-gray-600 rounded"></div>
    <div className="w-full h-10 bg-gray-600 rounded-lg mt-6"></div>
  </div>
);

const ConnectionCard = ({ connection }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center">
      <img
        alt={`${firstName} ${lastName}`}
        className="w-24 h-24 rounded-full object-cover shadow-md border-4 border-purple-600 mb-4"
        src={photoUrl || `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`}
        onError={(e) => { e.target.onerror = null; e.target.src=`https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`; }}
      />
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        {firstName} {lastName}
      </h2>
      {(age || gender) && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {age ? age : ""} {age && gender ? ", " : ""} {gender ? gender : ""}
        </p>
      )}
      <p className="text-gray-700 dark:text-gray-300 text-sm mt-3 line-clamp-3 min-h-[3rem] px-2">
        {about || "No description available."}
      </p>
      <Link
        to={`/chat/${_id}`}
        className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-full font-semibold transition-colors duration-300"
      >
        Chat
      </Link>
    </div>
  );
};

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (connections && connections.length > 0) {
      setLoading(false);
      return;
    }

    const fetchConnections = async () => {
      try {
        const res = await axios.get(BASE_URL + "/user/connections", {
          withCredentials: true,
        });
        dispatch(addConnection(res.data.data));
      } catch (err) {
        console.error("Error fetching connections:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 p-6 sm:p-12">
        <div className="max-w-7xl mx-auto">
          <div className="h-10 w-1/3 bg-gray-700 rounded animate-pulse mb-12"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!connections || connections.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 p-6 text-center text-gray-400">
        <svg
          className="w-24 h-24 mb-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m-7.5-2.962A3.375 3.375 0 0 1 9 12.25c0-1.03.394-1.983 1.054-2.723A3.375 3.375 0 0 1 12.25 9c1.03 0 1.983.394 2.723 1.054A3.375 3.375 0 0 1 15.75 12.25c0 1.03-.394 1.983-1.054 2.723A3.375 3.375 0 0 1 12.25 15.75c-1.03 0-1.983-.394-2.723-1.054ZM12 3.75a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z"
          />
        </svg>
        <h1 className="text-3xl font-semibold mb-2">No Connections Found</h1>
        <p className="max-w-md text-gray-500">
          It looks like you haven't made any connections yet. Go out and find some!
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-20 bg-gray-50 dark:bg-gray-900 p-6 sm:p-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
          Your Connections
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-12">
          You currently have {connections.length} connection
          {connections.length !== 1 ? "s" : ""}.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {connections.map((connection) => (
            <ConnectionCard key={connection._id} connection={connection} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Connections;
