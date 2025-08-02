import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
  };

  return (
    <section id="contact" className="w-full h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-20 px-6">
      <div className="max-w-screen-xl mx-auto text-center">
        
        {/* Header Section */}
        <div className="mb-10">
          <h2 className="text-5xl font-extrabold text-indigo-400">Contact Us</h2>
          <p className="text-gray-300 mt-3">We’d love to hear from you! Reach out to us anytime. 🚀</p>
          <div className="w-20 h-1 bg-indigo-500 mx-auto mt-3"></div>
        </div>

        {/* Contact Details & Form */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Contact Info */}
          <div className="text-left space-y-4 text-lg text-gray-300">
            <p>📩 <strong>Email:</strong> <a href="mailto:support@devtinder.com" className="text-indigo-400 hover:underline">support@devtinder.com</a></p>
            <p>📞 <strong>Phone:</strong> +1 234 567 890</p>
            <p>📍 <strong>Address:</strong> 123 Developer Lane, Code City, Devland</p>
          </div>

          {/* Right Side - Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-md"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-md"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32 resize-none transition-all shadow-md"
            ></textarea>

            <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow-lg transition-all">
              Send Message 🚀
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
