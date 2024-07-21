import "./App.css";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/SignUp";
import Home from "./pages/home/Home";

const App = () => {
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      {/* <Login /> */}
      {/* <Signup /> */}
      <Home />
    </div>
  );
};

export default App;
