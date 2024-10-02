import { useState } from "react";
import { useSearchParams } from "react-router-dom"; // Import useSearchParams
import { motion } from "framer-motion";
import { clientAPI } from "../api/axios-api.js";
import { UNSUBSCRIBE_ROUTE } from "../api/constants.js";

const Unsubscribe = () => {
  const [iconFont, setIconFont] = useState(false);
  const [success, setSuccess] = useState("");

  const [searchParams] = useSearchParams(); // Hook to get query parameters

  // Extract clientmail from the URL query parameters
  const clientMail = searchParams.get("clientmail");
  const userID = searchParams.get("userid");

  const handleMouseEnter = () => setIconFont(true);
  const handleMouseLeave = () => setIconFont(false);

  const unSubscribeAPI = async () => {
    const temp = { clientmail: clientMail, userId: userID };
    try {
      const response = await clientAPI.post(UNSUBSCRIBE_ROUTE, temp, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setSuccess("Successfully unsubscribed!")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnsubscribe = (e) => {
    e.preventDefault();
    unSubscribeAPI();
  };

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

      {/* Render the client email if it's available in the URL */}
      <div className="mt-32 p-4 flex flex-col items-center">
        <h1 className="text-2xl mb-5">Unsubscribe</h1>
        <div className="w-full max-w-md p-8 bg-gray-100 border border-gray-300 rounded-md text-center">
          <h2 className="text-xl mb-4">Are you sure?</h2>
          <p className="text-lg mb-5">
            {clientMail ? `Email: ${clientMail}` : "No email found."}
          </p>
          <button
            type="submit"
            className="px-5 py-2 border rounded-3xl bg-red-500 text-white"
            onClick={handleUnsubscribe}
          >
            Click to Unsubscribe
          </button>
        </div>
        {success && <p className="text-green-600">{success}</p>}
      </div>
    </>
  );
};

export default Unsubscribe;
