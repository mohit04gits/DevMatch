import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Contact from "./components/Contact";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import Feed from "./components/Feed";
import Connections from "./components/Connection";
import SignUp from "./components/SignUp";
import Requests from "./components/Requests";
import Chat from "./components/Chat";
import Premium from "./components/Premium";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="login" element={<Login />} />
            <Route path="/" element={<Feed />} />

            <Route path="profile" element={<Profile />} />
            <Route path="connections" element={<Connections />} />
            <Route path="signup" element={<SignUp />}></Route>
            <Route path="contact" element={<Contact />}></Route>
            <Route path="requests" element={<Requests />}></Route>
            <Route path="chat/:targetUserId" element={<Chat />} />
            <Route path="/premium" element={<Premium />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
