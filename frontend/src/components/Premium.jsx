import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { PageHeading } from "./UI";
import { FiLayers, FiZap, FiArrowRight } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";

const Premium = () => {
  const [pending, setPending] = useState("");
  const [error, setError] = useState("");
  const openCheckout = async (type) => {
    setPending(type);
    setError("");
    try { await handleBuyClick(type); }
    catch { setError("Checkout could not open. Please try again."); }
    finally { setPending(""); }
  };
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

  return <main className="dm-premium dm-container">
    <PageHeading eyebrow="DEVMATCH PREMIUM" title="Make room for more connections.">Choose the membership that fits your next chapter.</PageHeading>
    {error && <p role="alert" className="dm-alert">{error}</p>}
    <div className="dm-plan-grid">
      {[{id: "silver", title: "Silver", features: featuresSilver, icon: FiLayers}, {id: "gold", title: "Gold", features: featuresGold, icon: FiZap}].map(({id, title, features, icon: Icon}) => <article className={`dm-plan ${id === "gold" ? "dm-plan-gold" : ""}`} key={id}>
        <Icon className="dm-plan-icon" /><p className="dm-eyebrow">{title.toUpperCase()} MEMBERSHIP</p><h2>{title}</h2><p className="dm-plan-label">Your network, with a little more possibility.</p>
        <ul>{features.map(feature => <li key={feature}><FaCheckCircle />{feature}</li>)}</ul>
        <button disabled={Boolean(pending)} onClick={() => openCheckout(id)} className={`dm-button ${id === "silver" ? "dm-button-secondary" : ""}`}>{pending === id ? "Opening checkout..." : `Choose ${title}`}<FiArrowRight /></button>
      </article>)}
    </div><p className="dm-premium-note">Review the amount in Razorpay before completing your purchase.</p>
  </main>;
};
export default Premium;
