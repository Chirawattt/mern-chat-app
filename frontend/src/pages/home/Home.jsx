import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/message/MessageContainer";
import Profile from "../../components/profile/Profile";

const Home = () => {
  return (
    <>
      <div className="flex flex-col">
        <Profile />
        <div
          className="divider"
          style={{ marginTop: "0px", marginBottom: "0px" }}
        ></div>
        <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 backdrop-filter backdrop-blur-lg bg-opacity-0">
          <Sidebar />
          <MessageContainer />
        </div>
      </div>
    </>
  );
};
export default Home;
