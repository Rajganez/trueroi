import { RiAiGenerate } from "react-icons/ri";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { clientAPI } from "../../../api/axios-api.js";
import { GET_TESTIMONIAL, TESTIMONIAL_LINK } from "../../../api/constants.js";

// Generate unique string function
function generateUniqueString(length = 10) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charsLength = chars.length;
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charsLength));
  }
  return result;
}

const TestimonialsCreation = () => {
  const [link, setLink] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  const userid = localStorage.getItem("auth_token");

  const handleGenerateLink = async () => {
    const uniqueString = generateUniqueString(12); // You can specify the length of the random string here
    let temp = {
      userId: userid,
      uniqueString: uniqueString,
    };
    try {
      const response = await clientAPI.post(TESTIMONIAL_LINK, temp, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setLink(
          `${
            import.meta.env.VITE_TESTIMONIAL_URL
          }/feedback-matters/${uniqueString}`
        );
        setCopySuccess(false);
        setApiError("");
      }
    } catch (error) {
      setApiError(error.response.data.msg);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link).then(() => {
      setCopySuccess(true);
    });
  };

  const feedback = async () => {
    const temp = { userId: userid };
    try {
      const response = await clientAPI.post(GET_TESTIMONIAL, temp, {
        withCredentials: true,
      });
      if (response.status === 200) {
        if (response.data.testimonials.TestimonialStr) {
          setLink(
            `${import.meta.env.VITE_TESTIMONIAL_URL}/feedback-matters/${
              response.data.testimonials.TestimonialStr
            }`
          );
        }
      }
    } catch (error) {
      setApiError(error.response.data.msg);
    }
  };

  useEffect(() => {
    feedback();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="mt-5">
        <div className="lg:flex">
          <div className="text-xl ml-5 mt-2">
            Recently generated link will be active. Generate yours here.
          </div>
          <div className="ml-10 md:mt-0 mt-2">
            <motion.button
              className="flex border px-3 rounded-2xl bg-orange-600 p-2 text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleGenerateLink}
            >
              <RiAiGenerate className="mt-1 mr-2" />
              <span>Generate Link</span>
            </motion.button>
          </div>
        </div>
      </div>
      <div
        className="bg-black text-green-500 font-mono p-4 rounded-lg 
      shadow-lg w-full md:w-3/4 lg:w-[60%] mx-auto mt-10"
      >
        {apiError && <div className="text-red-600">{apiError}</div>}
        {link !== "" && <div>Your Generated Link</div>}
        {!link ? (
          <div className="flex items-center">
            <span className="text-green-300 pr-2">
              Click to Generate
              <span className="animate-pulse duration-500"> ...</span>
            </span>
          </div>
        ) : (
          <div className="md:flex items-center justify-between">
            <div>
              <span className="text-green-300 pr-2">{link}</span>
            </div>
            <button onClick={handleCopyLink} className="ml-4">
              <MdContentCopy
                className="text-2xl md:text-3xl lg:text-4xl 
              text-white hover:text-gray-400 cursor-pointer mt-2 lg:mt-0"
              />
            </button>
          </div>
        )}
        {copySuccess && (
          <p className="text-green-300 mt-2 animate-pulse">
            Link copied to clipboard!
          </p>
        )}
      </div>
    </>
  );
};

export default TestimonialsCreation;
