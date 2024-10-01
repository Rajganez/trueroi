import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const MessageBody = () => {
  const [subjectName, setSubjectName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(""); // State to handle errors


  // Function to handle changes in the textarea
  const handleInputChange = (event) => {
    setSubjectName(event.target.value); // Update the subject name state on change
    setError(""); // Clear error when user is typing
  };

  const handleSave = () => {
    if (subjectName.length < 10) {
      setError("Subject must be at least 10 characters long.");
      setShowSuccess(false); // Don't show "Saved" message
      return; // Exit function without saving
    }
    localStorage.setItem("smsMessageData", subjectName);
    setShowSuccess(true);
  };

  useEffect(() => {
    const subName = localStorage.getItem("smsMessageData");
    if (subName) {
      setSubjectName(subName);
    }
  }, []);

  return (
    <div className="lg:mt-20 mt-2 md:ml-10 p-2">
      <div className="md:flex">
        <div>
          <textarea
            rows="2"
            cols="50"
            value={subjectName}
            className="lg:w-[20rem] w-[15rem] md:p-2 p-1 pl-5 border rounded-3xl 
            border-orange-500 pt-1"
            placeholder="Enter Your Subject Here"
            onChange={handleInputChange} // Update text length on change
          ></textarea>
          {error && (
            <div className="text-xs text-red-600 mt-1 animate-pulse">
              {error}
            </div>
          )}
        </div>
        <div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="px-4 md:px-10 md:mt-3 lg:ml-10 md:ml-5 ml-20 md:p-2 p-1 border rounded-3xl bg-green-600 
            hover:bg-green-700"
            onClick={handleSave}
          >
            Save
          </motion.button>
          {showSuccess && (
            <div className="text-xs ml-3 mt-2 lg:ml-10 text-green-600 animate-pulse">
              Saved
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBody;
