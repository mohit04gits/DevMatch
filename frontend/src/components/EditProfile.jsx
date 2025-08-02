/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [skills, setSkills] = useState(user?.skills?.join(", ") || "");
  const [age, setAge] = useState(user?.age || "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();

  const saveProfile = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await axios.put(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender: gender.toLowerCase(),
          about,
          photoUrl,
          skills: skills.split(",").map((skill) => skill.trim()),
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      dispatch(addUser(res?.data?.data));
      setSuccess("Profile saved successfully!");
    } catch (err) {
      setError(err.response?.data || "An unexpected error occurred.");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(""), 3000);
    }
  };

  return (
    <div className="bg-base-100 mt-20 flex justify-center p-14 sm:p-8">
      <div className="w-full max-w-2xl bg-base-200 rounded-xl shadow-lg">
        <form onSubmit={saveProfile}>
          <div className="flex justify-between items-center p-6 border-b border-base-300">
            <div>
              <h2 className="text-2xl font-bold">Profile Settings</h2>
              <p className="text-sm text-base-content/70">Update your profile information.</p>
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading && <span className="loading loading-spinner"></span>}
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>

          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="avatar">
                <div className="w-20 rounded-full">
                  <img
                    src={photoUrl || `https://ui-avatars.com/api/?name=${firstName}+${lastName}`}
                    alt="Profile"
                  />
                </div>
              </div>
              <label className="form-control w-full">
                <span className="label-text">Photo URL</span>
                <input
                  value={photoUrl}
                  type="text"
                  placeholder="https://example.com/photo.jpg"
                  className="input input-bordered w-full mt-1"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>
            </div>

            <div className="divider my-8">Personal Details</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <label className="form-control w-full">
                <span className="label-text">First Name</span>
                <input
                  value={firstName}
                  type="text"
                  className="input input-bordered w-full mt-1"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>

              <label className="form-control w-full">
                <span className="label-text">Last Name</span>
                <input
                  value={lastName}
                  type="text"
                  className="input input-bordered w-full mt-1"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>

              <label className="form-control w-full">
                <span className="label-text">Age</span>
                <input
                  value={age}
                  type="number"
                  className="input input-bordered w-full mt-1"
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>

              <label className="form-control w-full">
                <span className="label-text">Gender</span>
                <select
                  value={gender}
                  className="select select-bordered mt-1"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option disabled value="">Pick one</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </label>

              <label className="form-control w-full md:col-span-2">
                <span className="label-text">About</span>
                <textarea
                  value={about}
                  className="textarea textarea-bordered w-full mt-1"
                  placeholder="Tell us a little about yourself"
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </label>

              <label className="form-control w-full md:col-span-2">
                <span className="label-text">Skills</span>
                <input
                  type="text"
                  value={skills}
                  className="input input-bordered w-full mt-1"
                  placeholder="e.g. JavaScript, React, Node.js"
                  onChange={(e) => setSkills(e.target.value)}
                />
              </label>
            </div>

            <div className="text-center mt-6 h-5">
              {error && <p className="text-sm text-red-500">{error}</p>}
              {success && <p className="text-sm text-green-500">{success}</p>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
