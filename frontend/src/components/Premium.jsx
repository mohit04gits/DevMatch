// import axios from "axios";
// import { BASE_URL } from "../utils/constants";

// const Premium = () => {
//   const handleBuyClick = async (type) => {
//     const order = await axios.post(
//       BASE_URL + "/payment/create",
//       {
//         membershipType: type,
//       },
//       { withCredentials: true }
//     );

//     const { amount, keyId, currency, notes, orderId } = order.data;

//     const options = {
//       key: keyId,
//       amount,
//       currency,
//       name: "DevTinder",
//       description: "Connect to other Developers",
//       order_id: orderId,
//       callback_url: "http://localhost:3000/payment-success",
//       prefill: {
//         name: notes.firstName + " " + notes.lastName,
//         email: notes.emailId,
//         contact: "9999999999",
//       },
//       theme: {
//         color: "#F37254",
//       },
//     };
//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   return (
//     <div className="flex mt-24 flex-col md:flex-row justify-center items-center gap-10 px-4 py-16">
//       {/* Silver Card */}
//       <div className="card bg-base-300 rounded-xl shadow-lg w-full max-w-sm p-6 text-center">
//         <h1 className="text-xl font-bold mb-4">Silver Membership</h1>
//         <ul className="mb-4 text-sm space-y-1">
//           <li>• Chat with others</li>
//           <li>• 100 connection requests per day</li>
//           <li>• Blue tick</li>
//         </ul>
//         <button
//           onClick={() => handleBuyClick("silver")}
//           className="btn btn-secondary w-full"
//         >
//           Buy Silver
//         </button>
//       </div>

//       {/* OR Divider for large screens */}
//       <div className="hidden md:block  text-xl font-bold">OR</div>

//       {/* Gold Card */}
//       <div className="card bg-base-300 rounded-xl shadow-lg w-full max-w-sm p-6 text-center">
//         <h1 className="text-xl font-bold mb-4">Gold Membership</h1>
//         <ul className="mb-4 text-sm space-y-1">
//           <li>• Chat with others</li>
//           <li>• 100 connection requests per day</li>
//           <li>• Blue tick</li>
//           <li>• 6 months premium badge</li>
//         </ul>
//         <button
//           onClick={() => handleBuyClick("gold")}
//           className="btn btn-primary w-full"
//         >
//           Buy Gold
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Premium;  









import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { FaCheckCircle } from "react-icons/fa";

const Premium = () => {
  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      { membershipType: type },
      { withCredentials: true }
    );

    const { amount, keyId, currency, notes, orderId } = order.data;

    const options = {
      key: keyId,
      amount,
      currency,
      name: "DevTinder",
      description: "Connect to other Developers",
      order_id: orderId,
      callback_url: "http://localhost:3000/payment-success",
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: "9999999999",
      },
      theme: {
        color: "#7C3AED",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const featuresSilver = [
    "Chat with others",
    "100 connection requests per day",
    "Blue tick",
  ];

  const featuresGold = [...featuresSilver, "6 months premium badge"];

  const FeatureList = ({ features }) => (
    <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-center">
          <FaCheckCircle className="text-purple-600 mr-2" />
          {feature}
        </li>
      ))}
    </ul>
  );

  return (
    <section className="min-h-[70vh] mt-10 flex flex-col justify-center items-center gap-10 px-6 py-16 max-w-md mx-auto">
      {/* Silver Card */}
      <div className="w-full rounded-3xl bg-white dark:bg-gray-900 shadow-lg p-8 flex flex-col items-center text-center border border-purple-300 dark:border-purple-700 hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-2xl font-extrabold text-purple-700 mb-6">
          Silver Membership
        </h2>
        <FeatureList features={featuresSilver} />
        <button
          onClick={() => handleBuyClick("silver")}
          className="mt-8 w-full py-3 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors duration-300 shadow-md"
          aria-label="Buy Silver Membership"
        >
          Buy Silver
        </button>
      </div>

      {/* OR Divider */}
      <div className="font-bold text-xl text-purple-600 select-none">OR</div>

      {/* Gold Card */}
      <div className="w-full rounded-3xl bg-gradient-to-br from-purple-700 to-purple-900 shadow-xl p-8 flex flex-col items-center text-center border-2 border-yellow-400 hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-2xl font-extrabold text-yellow-300 mb-6">
          Gold Membership
        </h2>
        <FeatureList features={featuresGold} />
        <button
          onClick={() => handleBuyClick("gold")}
          className="mt-8 w-full py-3 rounded-full bg-yellow-400 text-purple-900 font-semibold hover:bg-yellow-300 transition-colors duration-300 shadow-md"
          aria-label="Buy Gold Membership"
        >
          Buy Gold
        </button>
      </div>
    </section>
  );
};

export default Premium;
