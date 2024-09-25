import { Outlet } from "react-router-dom";
import Navbar from "../components/User/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Home;
