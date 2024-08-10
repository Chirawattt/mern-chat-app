import { useAuthContext } from "../../context/AuthContext";
import LogoutButton from "../sidebar/LogoutButton";
import Clock from "react-live-clock";

const Profile = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="flex rounded-lg overflow-hidden bg-gray-400 backdrop-filter backdrop-blur-lg bg-opacity-0">
      <div className="flex items-center justify-around p-4 w-full text-gray-200">
        <img
          src={authUser.profilePic}
          alt="profile"
          className="h-12 w-12 rounded-full"
        />
        <div className="mid-container flex flex-col items-center justify-center">
          <h1 className="text-xl font-bold">{authUser.fullName}</h1>
          <Clock format={"HH:mm:ss A"} ticking={true} />
        </div>
        <LogoutButton />
      </div>
    </div>
  );
};
export default Profile;
