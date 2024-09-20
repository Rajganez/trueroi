import { useState } from "react";
import { motion } from "framer-motion";
import Describe from "./Describe";
import Demo from "./Demo";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [iconFont, setIconFont] = useState(false);

  const navigate = useNavigate();

  // Function to handle mouse enter and leave
  const handleMouseEnter = () => setIconFont(true);
  const handleMouseLeave = () => setIconFont(false);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  }

  return (
    <>
      <div className="flex justify-between border w-screen h-24 md:h-32 bg-[#DBD9F7] fixed z-50 top-0">
        <div
          className="mt-5 md:p-1 md:ml-10 ml-4"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span
            className="text-4xl md:text-6xl text-red-950"
            style={{ fontFamily: "Abreviater", fontStyle: "bold" }}
          >
            T
          </span>
          {iconFont && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="text-xl md:text-3xl text-blue-900"
            >
              rue
            </motion.span>
          )}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "linear", duration: 1 }}
            className="text-3xl md:text-5xl text-blue-950"
          >
            ROI
          </motion.span>
          <motion.hr
            style={{ width: iconFont ? "50%" : "20%" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="ml-1 border-black"
          />
          <div className="ml-5 md:ml-10 text-xs font-thin mt-1 text-black">
            Get yours
          </div>
        </div>
        <div className="text-xl md:text-2xl mt-6 md:mr-20 mr-4">
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="border rounded-full p-2 md:p-4 bg-[#3B3686] hover:bg-[white] text-white hover:text-slate-950"
            style={{ minWidth: "100px" }} // Adjust as needed for capsule shape
            onClick={handleLogin}
          >
            Login
          </motion.button>
        </div>
      </div>
      <Describe />
      <Demo />
      <Footer />
    </>
  );
};

export default Navbar;
