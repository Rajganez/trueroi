import { Outlet } from "react-router-dom";
import { lazy } from "react";

const Navbar = lazy(() => import("../components/User/Navbar"));

const Home = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Home;
