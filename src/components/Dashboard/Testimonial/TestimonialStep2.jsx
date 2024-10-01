import { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { MdOutlineArrowBack } from "react-icons/md";
import { clientAPI } from "../../../api/axios-api.js";
import { SEND_FEEDBACK_ROUTE } from "../../../api/constants.js";
import { useParams } from "react-router-dom";

const TestimonialStep2 = ({
  currentStep,
  totalSteps,
  handleNext,
  handlePrev,
}) => {
  const [rating, setRating] = useState(0); // Store the selected rating
  const [feedback, setFeedback] = useState(""); // Store feedback text
  const str = useParams();
  // Function to handle star click
  const handleStarClick = (starIndex) => {
    setRating(starIndex);
  };

  const submitFeedback = async () => {
    const clientDetails = JSON.parse(localStorage.getItem("client_Details"));
    const temp = {
      ratings: rating,
      feedBack: feedback,
      paramStr: str.idStr,
      clientName: clientDetails.name,
      clientEmail: clientDetails.email,
    };
    try {
      const response = await clientAPI.post(SEND_FEEDBACK_ROUTE, temp, {
        withCredentials: true,
      });
      if (response.status === 200) {
        console.log(response.status);
        handleNext();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitAndNext = (e) => {
    e.preventDefault();
    if (rating && feedback) {
      submitFeedback();
    }
  };
  return (
    <>
      <div className="mb-5">
        <motion.button
          className={` ${
            currentStep === 1 ? "opacity-50" : "hover:bg-gray-700"
          }`}
          onClick={handlePrev}
          disabled={currentStep === 1}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
        >
          <MdOutlineArrowBack className="text-4xl text-gray-500" />
        </motion.button>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl mb-4">Rate Your Experience</h2>

        <div className="flex">
          {[1, 2, 3, 4, 5].map((starIndex) => (
            <span
              key={starIndex}
              className={`cursor-pointer text-3xl ${
                starIndex <= rating ? "text-yellow-500" : "text-gray-400"
              }`}
              required
              onClick={() => handleStarClick(starIndex)}
            >
              ★
            </span>
          ))}
        </div>
        <p className="mt-2 text-lg">
          You rated: {rating} {rating === 1 ? "star" : "stars"}
        </p>

        <textarea
          className="mt-4 p-2 border rounded w-full md:w-2/3"
          rows="4"
          placeholder="Enter your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        ></textarea>
        <button
          className={`px-4 py-2 mt-5 md:ml-44 bg-blue-500 text-white rounded ${
            currentStep === totalSteps ? "opacity-50" : "hover:bg-blue-600"
          }`}
          onClick={handleSubmitAndNext}
          disabled={currentStep === totalSteps}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default TestimonialStep2;

TestimonialStep2.propTypes = {
  currentStep: PropTypes.number,
  totalSteps: PropTypes.number,
  handleNext: PropTypes.func,
  handlePrev: PropTypes.func,
};
