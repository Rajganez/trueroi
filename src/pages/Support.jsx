import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { clientAPI } from "../api/axios-api.js";
import { FORGOT_PASSWORD_ROUTE } from "../api/constants.js";

const Support = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [iconFont, setIconFont] = useState(false);

  const handleMouseEnter = () => setIconFont(true);
  const handleMouseLeave = () => setIconFont(false);

  const temp = { mailId: email };
  const passwordLinkAPI = async () => {
    try {
      const response = await clientAPI.post(FORGOT_PASSWORD_ROUTE, temp);
      if (response.status === 200) {
        setMessage("Please Check Your Mail Box For Password Reset Link");
      }
    } catch (error) {
      alert(error.response.data.msg)
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }, [message]);
  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Validate email format (basic validation)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    passwordLinkAPI();
    setError("");
    setEmail("");
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
      <div
        className="bg-[#DBD9F7] md:h-[30rem] h-[100%] md:mt-32 mt-24 relative"
        style={{
          borderBottomLeftRadius: "80% 150px",
        }}
      >
        <div className="bg-[#DBD9F7] p-10 h-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-5">
              Support Page
            </h1>
            <p className="text-lg text-gray-700 mb-4">
              If you Forgot your Password, use the option below.
            </p>
            <div className="mt-8">
              <form className="mt-10">
                <div className="mb-4">
                  <label className="block text-lg text-gray-800">
                    Enter your Email:
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Your Registered Email Address"
                    className="border w-[60%] rounded-lg p-2 mt-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </form>
              <button
                className="bg-[#f65b07] text-white rounded-full px-5 py-2"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </button>
            </div>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            {message && (
              <div className="text-green-500 text-center mt-4">{message}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Support;
