import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { MdOutlineArrowBack } from "react-icons/md";

const TestimonialStep1 = ({
  currentStep,
  totalSteps,
  handleNext,
  handlePrev,
}) => {
  const initialState = {
    name: "",
    email: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    const loginMail = formData.email || "";
    const validEmailDomains = [".com", ".in", ".org", ".dev"];
    const emailDomainValid = validEmailDomains.some((domain) =>
      loginMail.endsWith(domain)
    );
    if (!loginMail.includes("@") || !emailDomainValid) {
      setError("Enter a valid email");
      return false; // Validation failed
    }
    setError(""); // Clear any previous errors
    localStorage.setItem("client_Details", JSON.stringify(formData));
    return true; // Validation successful
  };

  const handleSubmitAndNext = (e) => {
    if (handleSubmit(e)) {
      handleNext();
    }
  };

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("client_Details"));
    if (savedState) {
      setFormData(savedState); // Populate formData with saved state on mount
    }
  }, []);

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
      <form className="">
        <div>
          <label>Name </label>
          <input
            type="text"
            placeholder="Your Name"
            className="p-2 rounded-xl ml-2 md:w-[80%] w-full"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-5">
          <label>Email </label>
          <input
            type="email"
            placeholder="john@gmail.com"
            className="p-2 rounded-xl ml-2 md:w-[80%] w-full"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <motion.button
          className={`px-4 py-2 mt-5 md:ml-44 bg-blue-500 text-white rounded ${
            currentStep === totalSteps ? "opacity-50" : "hover:bg-blue-600"
          }`}
          onClick={handleSubmitAndNext}
          disabled={currentStep === totalSteps}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
        >
          Next
        </motion.button>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-red-500"
          >
            {error}
          </motion.div>
        )}
      </form>
    </>
  );
};

export default TestimonialStep1;

TestimonialStep1.propTypes = {
  currentStep: PropTypes.number,
  totalSteps: PropTypes.number,
  handleNext: PropTypes.func,
  handlePrev: PropTypes.func,
};
