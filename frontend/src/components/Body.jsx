import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const Body = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);
  const navigate = useNavigate();

  const fetchUser = async () => {
    if (userData) return;

    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        console.error(err);
      }

      navigate("/login");
      console.error(err);
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, []);

  return (
    <div className="app-shell min-h-screen">
      <a className="dm-skip" href="#main-content">Skip to content</a>
      <NavBar />

      <div className="app-content" id="main-content">
        <Outlet />
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default Body;