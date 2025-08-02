import { useSelector } from "react-redux";
import EditProfile from "./EditProfile"

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    user && 
    (<div className="overflow-scroll w-full h-full">
      <EditProfile user={user}  />
    </div>)
  )
}

export default Profile;