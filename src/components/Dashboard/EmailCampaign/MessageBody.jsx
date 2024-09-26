import { useState } from "react";
import { motion } from "framer-motion";

const MessageBody = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  // Initial state for the editable fields
  const initialData = {
    companyName: "Enter Your Company Name Or Greeting Message",
    greetingMessage: "Hello,",
    leadMessage: "Enter Your Lead Generating Messages for your customers.",
    additionalMessage: "Add Your Message here.",
    contactMessage: "Provide your business number",
  };

  // Load data from local storage or use the initial data
  const [messageData, setMessageData] = useState(
    JSON.parse(localStorage.getItem("messageData")) || initialData
  );

  // Handle changes in editable fields
  const handleEdit = (field, value) => {
    setMessageData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Handle the Save button to save the data to local storage
  const handleSave = () => {
    localStorage.setItem("messageData", JSON.stringify(messageData));
    setShowSuccess(true);
  };

  return (
    <>
      <p className="text-sm font-semibold mb-4">
        Edit the below Template and Send Your Message
      </p>
      <div className="bg-gray-100 lg:w-[50rem] md:w-[25rem] lg:p-6">
        <div className="max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-green-500 lg:p-6 p-2">
            <h1
              className="text-white lg:text-xl font-bold"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleEdit("companyName", e.target.innerText)}
            >
              {messageData.companyName}
            </h1>
          </div>

          {/* Main Content */}
          <div className="lg:p-6 p-2">
            <h2
              className="lg:text-2xl text-lg font-semibold mb-4"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleEdit("greetingMessage", e.target.innerText)}
            >
              {messageData.greetingMessage}
            </h2>
            <p
              className="text-gray-700 mb-4 text-xs md:text-lg"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleEdit("leadMessage", e.target.innerText)}
            >
              {messageData.leadMessage}
            </p>
            {/* <img
              src="https://via.placeholder.com/500x200"
              alt="Feature Image"
              className="w-full h-auto mb-6"
            /> */}
            <p
              className="text-gray-700 mb-6 text-xs md:text-lg"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                handleEdit("additionalMessage", e.target.innerText)
              }
            >
              {messageData.additionalMessage}
            </p>
            {/* Button */}
            {/* <div className="text-center text-xs md:text-lg">
                <button
                  className="inline-block px-6 py-3 text-white bg-green-500 rounded 
                  hover:bg-green-600 transition"
                >
                  Get Started
                </button>
              </div> */}
            <p
              className="text-gray-700 mt-6 text-xs md:text-lg"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleEdit("contactMessage", e.target.innerText)}
            >
              {messageData.contactMessage}
            </p>
          </div>
          {/* Footer */}
          {/* <div className="bg-gray-200 p-4 text-center text-xs md:text-sm text-gray-600">
            &copy; 2024 Your Company Name. All rights reserved.
            <br />
            <a
              href="https://example.com/unsubscribe"
              className="text-green-500"
            >
              Unsubscribe
            </a>
          </div> */}
        </div>
      </div>
      <div className="">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="px-4 md:px-10 md:mt-3 lg:ml-10 ml-20 md:p-2 p-1 border rounded-3xl bg-green-600 
            hover:bg-green-700"
          onClick={handleSave}
        >
          Save
        </motion.button>
        {showSuccess && (
          <div className="text-xs ml-3 mt-2 md:ml-10 text-green-600 animate-pulse">
            Saved
          </div>
        )}
      </div>
    </>
  );
};

export default MessageBody;
