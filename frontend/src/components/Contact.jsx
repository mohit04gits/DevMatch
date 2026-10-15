import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [notice, setNotice] = useState("");
  const handleChange = (e) => { const { name, value } = e.target; setFormData((prevData) => ({ ...prevData, [name]: value })); };
  const handleSubmit = (e) => { e.preventDefault(); setNotice("Your message has not been sent. Contact delivery is not available yet."); };
  return <main id="contact" className="dm-contact dm-container"><section><p className="dm-eyebrow">LET’S TALK</p><h1>Good products start with a conversation.</h1><p className="dm-muted">Have a question or an idea for DevMatch? There’s room for your perspective.</p><div className="dm-panel mt-8"><p className="dm-eyebrow">CONTACT AVAILABILITY</p><p className="dm-muted">Message delivery is not connected yet. This form does not send or save your message.</p></div></section><form onSubmit={handleSubmit} className="dm-form"><label htmlFor="contact-name">Your name<input id="contact-name" type="text" name="name" autoComplete="name" placeholder="Your name" value={formData.name} onChange={handleChange} required /></label><label htmlFor="contact-email">Email address<input id="contact-email" type="email" name="email" autoComplete="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required /></label><label htmlFor="contact-message">Your message<textarea id="contact-message" name="message" placeholder="What’s on your mind?" rows={6} value={formData.message} onChange={handleChange} required /></label><button type="submit" className="dm-button dm-button-secondary">Check availability<FiArrowRight /></button>{notice && <p role="status" className="dm-alert">{notice}</p>}</form></main>;
};
export default Contact;
