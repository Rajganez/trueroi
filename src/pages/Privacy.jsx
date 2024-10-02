import { useState } from "react";
import { motion } from "framer-motion";

const Privacy = () => {
  const [iconFont, setIconFont] = useState(false);

  const handleMouseEnter = () => setIconFont(true);
  const handleMouseLeave = () => setIconFont(false);
  return (
    <>
      <div className="flex justify-between border w-screen h-24 md:h-32 bg-[#f6bea0] fixed z-50 top-0">
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
        className="bg-[#f6bea0] md:h-[30rem] h-[100%] md:mt-32 mt-24 relative"
        style={{
          borderBottomLeftRadius: "80% 150px",
        }}
      >
        <div className="bg-[#f6bea0] h-auto p-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-5">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-700 mb-4">
              We take your privacy very seriously. The contact details and any
              other personal information you provide to us through our demo
              booking form, or any other means, will remain confidential and
              protected at all times.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              <strong>Under no circumstances</strong> will your information be
              shared, sold, or disclosed to any third party for any reason
              whatsoever. We are committed to ensuring that your personal
              information is handled with the utmost care and in full compliance
              with all applicable data protection regulations.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              The security of your contact details is our top priority. We use
              industry-standard encryption and security measures to protect your
              data from unauthorized access, ensuring that your personal
              information is safe and secure at all times.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              If you have any questions or concerns about our privacy practices,
              feel free to contact us directly. We are happy to provide any
              additional information or clarification that you may need.
            </p>
            <p className="text-lg font-bold text-gray-900">
              Your privacy is our responsibility, and we will do everything
              possible to safeguard your information.
            </p>
            <div className="mt-10 text-lg text-gray-800">
              <p>For any queries, please contact:</p>
              <p>Email: trueroiservices@gmail.com</p>
              <p>Phone: 0422-2345678</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
