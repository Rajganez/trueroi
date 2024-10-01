import PropTypes from "prop-types";
import { MdOutlineArrowBack } from "react-icons/md";
import { motion } from "framer-motion";

const TestimonialStep3 = ({ currentStep, handlePrev }) => {
  return (
    <>
      <motion.button
        className={` ${currentStep === 1 ? "opacity-50" : "hover:bg-gray-700"}`}
        onClick={handlePrev}
        disabled={currentStep === 1}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}
      >
        <MdOutlineArrowBack className="text-4xl text-gray-500" />
      </motion.button>
      <div className="flex flex-col items-center mt-5">
        <h2 className="text-2xl mb-4">Thank You for Your Feedback!</h2>
        <p className="text-lg text-center">
          We truly appreciate your input. Your feedback helps us improve and
          provide a better experience for everyone.
        </p>
        <p className="mt-4 text-md">
          If you have any more thoughts or suggestions, feel free to reach out
          to us!
        </p>
      </div>
    </>
  );
};

export default TestimonialStep3;

TestimonialStep3.propTypes = {
  currentStep: PropTypes.number,
  totalSteps: PropTypes.number,
  handleNext: PropTypes.func,
  handlePrev: PropTypes.func,
};
