import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const FullScreenLoader = ({ isLoading, setIsLoading }) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setShowSuccessMessage(true);
    }
  }, [isLoading]);

  const handleOkClick = () => {
    setShowSuccessMessage(false);
    setIsLoading(false); // Assuming this prop is used to control the visibility of this component.
  };

  if (showSuccessMessage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <motion.div
          className="p-6 bg-white rounded-lg shadow-lg text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-lg font-bold mb-4">Email Sent Successfully!</h2>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={handleOkClick}
          >
            Ok
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <motion.div
        className="loader"
        initial={{ scale: 0.5 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="h-12 w-12 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
      </motion.div>
    </div>
  );
};

export default FullScreenLoader;

FullScreenLoader.propTypes = {
  isLoading: PropTypes.bool,
  setIsLoading: PropTypes.func,
};
