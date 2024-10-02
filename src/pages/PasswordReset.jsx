import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { clientAPI } from "../api/axios-api.js";
import { PASSWORD_RESET_ROUTE } from "../api/constants.js";

const PasswordReset = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [iconFont, setIconFont] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // New state for showing/hiding password

  const handleMouseEnter = () => setIconFont(true);
  const handleMouseLeave = () => setIconFont(false);

  const id = useParams();
  const navigate = useNavigate();

  // Create payload
  const temp = {
    password: newPassword,
    userId: id,
  };

  const passwordResetAPI = async () => {
    try {
      const response = await clientAPI.post(PASSWORD_RESET_ROUTE, temp);
      if (response.status === 200) {
        alert(
          "Password reset successful. You can now login with new password."
        );
        setNewPassword("");
        setConfirmPassword("");
        setError("");
        navigate("/home");
      }
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the passwords
    if (!newPassword || !confirmPassword) {
      setError("Both fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordPattern.test(newPassword)) {
      setError(
        "Password must be at least 6 characters long and include letters and numbers."
      );
      return;
    } else {
      passwordResetAPI();
    }
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

        <div className="flex flex-col items-center justify-center min-h-screen bg-[#DBD9F7]">
          <div className="bg-white p-5 rounded-lg shadow-md w-[90%] md:w-[40%]">
            <h2 className="text-2xl mb-4">Reset Your Password</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 relative">
                <label htmlFor="newPassword" className="block text-gray-700">
                  New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"} // Toggle input type
                  id="newPassword"
                  className="border rounded-lg p-2 w-full"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                {/* Eye icon for toggling password visibility */}
                <button
                  type="button"
                  className="absolute right-2 top-8"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <span role="img" aria-label="Hide">
                      👁️
                    </span>
                  ) : (
                    <span role="img" aria-label="Show">
                      👁️‍🗨️
                    </span>
                  )}
                </button>
              </div>
              <div className="mb-4 relative">
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700"
                >
                  Confirm New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"} // Toggle input type
                  id="confirmPassword"
                  className="border rounded-lg p-2 w-full"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-8"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <span role="img" aria-label="Hide">
                      👁️
                    </span>
                  ) : (
                    <span role="img" aria-label="Show">
                      👁️‍🗨️
                    </span>
                  )}
                </button>
              </div>
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7 }}
                  className="text-red-500 mb-4"
                >
                  {error}
                </motion.div>
              )}
              <motion.button
                type="submit"
                className="bg-blue-900 text-white rounded-lg p-2 w-full hover:bg-blue-700"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Reset Password
              </motion.button>
            </form>
          </div>
        </div>
    </>
  );
};

export default PasswordReset;
