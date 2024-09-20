import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ListImg from "../assets/loademailid.png";
import TestimonialLink from "../assets/gettestimoniallink.png";
import HappyCustomer from "../assets/generateleads.png";
import Footer from "../components/Footer";

const images = [ListImg, TestimonialLink, HappyCustomer];

const Login = () => {
  const [iconFont, setIconFont] = useState(false);

  const [currentImage, setCurrentImage] = useState(0);

  // Function to cycle through the images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, []);
  // Function to handle mouse enter and leave
  const handleMouseEnter = () => setIconFont(true);
  const handleMouseLeave = () => setIconFont(false);
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
      </div>
      <div
        className="bg-[#DBD9F7] md:h-[30rem] h-[100%] md:mt-32 mt-24 relative"
        style={{
          borderBottomLeftRadius: "80% 150px",
        }}
      >
        <div className="md:flex">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            // className="flex justify-center items-center"
          >
            <img
              src={images[currentImage]}
              alt="Carousel Image"
              width={300}
              height={300}
              className="object-contain mt-5 md:ml-10 ml-2 rounded-3xl"
            />
          </motion.div>
          <div className="md:text-lg text-xs mt-5 md:ml-10 ml-2 md:w-[20%]">
            <div>
              Smart Solutions for Customer Success : Update your customer email
              and phone number to the List and send
            </div>
            <div>
              Accelerate Your Customer Journey : Generate your testimonial link
              and share to your customer
            </div>
            <div>Boost Engagement, Drive Results</div>
          </div>
          <div className="md:ml-60 md:mt-10 w-[30%]">
            <div className="text-3xl mt-5">Log In</div>
            <form className="mt-10">
              <div>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="p-2 rounded-xl md:w-[80%] w-screen"
                />
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  className="p-2 rounded-xl md:w-[80%] w-screen"
                />
              </div>
              <div className="mt-5 ml-2">
                <button
                  type="button"
                  className="rounded-lg border-2 p-2"
                  style={{ width: "80%" }}
                >
                  Log In
                </button>
              </div>
              <div className="text-lg mt-5">Not a User? Register</div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
