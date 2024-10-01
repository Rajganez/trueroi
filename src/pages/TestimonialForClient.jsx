import { useState } from "react";
// import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import TestimonialStep1 from "../components/Dashboard/Testimonial/TestimonialStep1";
import TestimonialStep3 from "../components/Dashboard/Testimonial/TestimonialStep3";
import TestimonialStep2 from "../components/Dashboard/Testimonial/TestimonialStep2";

const TestimonialForClient = () => {
  const [iconFont, setIconFont] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Total number of steps
  const totalSteps = 3;

  // Calculate progress percentage based on the current step
  const progressPercentage = (currentStep / totalSteps) * 100;

  // Handle next button click
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handle previous button click
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleMouseEnter = () => setIconFont(true);
  const handleMouseLeave = () => setIconFont(false);

  // const idStr = useParams();

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
        className="bg-[#DBD9F7] md:h-[32rem] h-screen md:mt-32 mt-24 relative"
        style={{
          borderBottomLeftRadius: "80% 150px",
        }}
      >
        <div className="md:ml-10 ml-3 lg:text-2xl">
          Your Opinion Matters: Complete 3 Quick Steps to Share Feedback and
          Help to Improve!
        </div>
        <div className="w-full max-w-lg mx-auto p-5 mt-10">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              className="bg-blue-500 h-2.5 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between text-sm font-medium text-gray-700 mb-8">
            <span className={currentStep >= 1 ? "text-blue-500" : ""}>
              Step 1
            </span>
            <span className={currentStep >= 2 ? "text-blue-500" : ""}>
              Step 2
            </span>
            <span className={currentStep >= 3 ? "text-blue-500" : ""}>
              Step 3
            </span>
          </div>

          {/* Content for each step */}
          <div className=" p-6 rounded-lg shadow-md mb-4">
            {currentStep === 1 && (
              <TestimonialStep1
                currentStep={currentStep}
                totalSteps={totalSteps}
                handleNext={handleNext}
                handlePrev={handlePrev}
              />
            )}
            {currentStep === 2 && (
              <TestimonialStep2
                currentStep={currentStep}
                totalSteps={totalSteps}
                handleNext={handleNext}
                handlePrev={handlePrev}
              />
            )}
            {currentStep === 3 && (
              <TestimonialStep3
                currentStep={currentStep}
                totalSteps={totalSteps}
                handleNext={handleNext}
                handlePrev={handlePrev}
              />
            )}
          </div>

          {/* Buttons */}
          {/* <div className="flex justify-between">
            <button
              className={`px-4 py-2 bg-gray-300 rounded ${
                currentStep === 1 ? "opacity-50" : "hover:bg-gray-400"
              }`}
              onClick={handlePrev}
              disabled={currentStep === 1}
            >
              Previous
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default TestimonialForClient;
