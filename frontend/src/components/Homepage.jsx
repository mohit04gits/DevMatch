import { useNavigate } from "react-router-dom";
import { FaUsers, FaHandshake, FaComments, FaLaptopCode } from "react-icons/fa";

const features = [
  {
    icon: <FaUsers className="text-purple-600 w-8 h-8" />,
    title: "Connect with Developers",
    description:
      "Find and connect with developers worldwide, expand your professional network.",
  },
  {
    icon: <FaHandshake className="text-purple-600 w-8 h-8" />,
    title: "Collaboration Made Easy",
    description:
      "Work together on projects, share ideas, and grow your skills through collaboration.",
  },
  {
    icon: <FaComments className="text-purple-600 w-8 h-8" />,
    title: "Instant Chat",
    description:
      "Communicate in real-time with your connections to stay updated and motivated.",
  },
  {
    icon: <FaLaptopCode className="text-purple-600 w-8 h-8" />,
    title: "Showcase Your Work",
    description:
      "Display your projects and skills to attract potential collaborators or employers.",
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-50 via-white to-purple-100 flex flex-col justify-center items-center px-6 py-20">
      {/* Header */}
      <h1 className="text-5xl font-extrabold text-purple-700 mb-6 text-center">
        Welcome to <span className="text-purple-900">DevMatch</span>
      </h1>

      {/* Intro */}
      <p className="max-w-xl text-center text-gray-700 text-lg mb-12">
        DevMatch is your platform to connect, collaborate, and grow with
        developers worldwide. Whether you want to build new projects, expand your
        network, or showcase your skills, DevMatch makes it easy and fun!
      </p>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full mb-12">
        {features.map(({ icon, title, description }, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md p-6 flex space-x-4 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center justify-center">{icon}</div>
            <div>
              <h3 className="text-xl font-semibold text-purple-800 mb-2">
                {title}
              </h3>
              <p className="text-gray-600">{description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Get Started Button */}
      <button
        onClick={() => navigate("/login")}
        className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-4 px-12 rounded-full shadow-lg transition-colors duration-300"
        aria-label="Get Started"
      >
        Get Started
      </button>
    </div>
  );
};

export default HomePage;
