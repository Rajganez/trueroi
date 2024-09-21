import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Mail from "../assets/mailing.jpg";
import Sms from "../assets/sms.jpg";
import Testimonial from "../assets/testimonials.jpg";
import { useNavigate } from "react-router-dom";

const images = [Mail, Sms, Testimonial];

const Describe = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const navigate = useNavigate();

  // Function to cycle through the images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <div
      className="bg-[#DBD9F7] md:h-[30rem] h-[24rem] md:mt-32 mt-24 relative"
      style={{
        borderBottomRightRadius: "80% 150px",
      }}
    >
      <div className="md:text-4xl text-gray-700 text-2xl md:ml-20 ml-7 pt-10">
        Your Marketing, Simplified
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:mt-5 mt-2 mx-5">
        {/* Text Column */}
        <div className="grid grid-cols-1 gap-y-5 md:text-xl text-xs text-gray-800">
          <div className="border-x-violet-900 md:p-2 p-1 rounded">
            <strong>Email and Message Campaigns:</strong> Our platform allows
            you to send personalized, targeted emails and messages to your
            customers.
          </div>
          <div className="border-x-violet-900 md:p-2 p-1 rounded">
            <strong>Testimonial Link Creation:</strong> Leverage the power of
            social proof by generating easy-to-share testimonial links. Collect
            authentic customer reviews and feedback effortlessly.
          </div>
          <div className="border-x-violet-900 md:p-2 p-1 rounded">
            <strong>Lead Generation through Clicks:</strong> We make it easy to
            generate and track high-quality leads through actionable click-based
            campaigns.
          </div>
        </div>
        {/* Image Column */}
        <div className="hidden md:flex justify-center items-center">
          <div
            className="rounded-full flex justify-center items-center overflow-hidden"
            style={{
              borderTopRightRadius: "100%",
              borderBottomLeftRadius: "100%",
              position: "relative",
            }}
          >
            {/* Framer Motion Carousel */}
            <motion.div
              key={currentImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center items-center"
            >
              <img
                src={images[currentImage]}
                alt="Carousel Image"
                className="object-contain h-[80%]"
              />
            </motion.div>
          </div>
        </div>
      </div>
      <div className="mt-5 ml-10 md:ml-36 md:mt-3">
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          className="border rounded-full hover:bg-[#3B3686] hover:text-white border-black p-2 md:px-10"
          onClick={handleRegister}
        >
          Get Started
        </motion.button>
      </div>
    </div>
  );
};

export default Describe;
