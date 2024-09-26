import { BsSend } from "react-icons/bs";
import { AiFillCaretRight } from "react-icons/ai";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ActivityName from "./ActivityName";
import Recipient from "./Recipient";
import Subject from "./Subject";
import MessageBody from "./MessageBody";
import Signature from "./Signature";
import { TiEyeOutline } from "react-icons/ti";
import PreviewModal from "./PreviewModal";

// Define an array for the sidebar labels for easy indexing
const sidebarLabels = [
  "Activity Name",
  "Recipient",
  "Subject",
  "Message",
  "Signature",
];

const SidebarItem = ({ label, onClick, isActive, renderContent }) => (
  <div>
    <motion.div
      className={`lg:mx-3 md:ml-0 ml-10 md:mx-2 md:p-1 lg:p-3 flex cursor-pointer items-center 
        md:rounded-2xl ${isActive ? "scale-110 opacity-100" : "opacity-60"}`}
      onClick={onClick}
      whileHover={{ scale: 1.1 }} // Hover effect for slight scaling
      animate={{ scale: isActive ? 1.2 : 1, opacity: isActive ? 1 : 0.6 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      {label}
      {isActive && <AiFillCaretRight className="mr-2" />}{" "}
      {/* Show icon if active */}
    </motion.div>
    {/* Show content below SidebarItem on small screens */}
    <div className="block md:hidden mt-2 ml-10">
      {isActive && (
        <div className="p-2 bg-gray-100 rounded">{renderContent()}</div>
      )}
    </div>
  </div>
);

SidebarItem.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired, // Added prop to indicate active item
  renderContent: PropTypes.func.isRequired, // Function to render the content below the item
};

const CreateActivity = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showPreviewButton, setShowPreviewButton] = useState(false);
  const [activityData, setActivityData] = useState({});

  // Calculate the width based on the active index
  const calculateWidth = () => `${(activeIndex + 1) * 20}%`;

  // Check local storage values and set the visibility of the Preview button
  const checkLocalStorage = () => {
    const activityName = localStorage.getItem("activityName");
    const subjectName = localStorage.getItem("subjectName");
    const signatureData = localStorage.getItem("signatureData");
    const messageData = localStorage.getItem("messageData");
    const recipientMail = localStorage.getItem("recipientMail");

    // If all local storage values are not empty, show the Preview button
    if (activityName && subjectName && signatureData && messageData && recipientMail) {
      setActivityData({
        activityName,
        subjectName,
        signatureData,
        messageData,
      });
      setShowPreviewButton(true);
    } else {
      setShowPreviewButton(false);
    }
  };

  // Run the check when the component mounts
  useEffect(() => {
    checkLocalStorage();
  }, []);

  const renderContent = () => {
    switch (sidebarLabels[activeIndex]) {
      case "Activity Name":
        return <ActivityName />;
      case "Recipient":
        return <Recipient />;
      case "Subject":
        return <Subject />;
      case "Message":
        return <MessageBody />;
      case "Signature":
        return <Signature />;
      default:
        return <div>Welcome to the Email Campaign</div>;
    }
  };

  const handlePreview = () => {
    setShowModal(true); 
  };

  return (
    <>
      <div className="flex items-center">
        <div className="w-[80%] mt-5 bg-gray-200 rounded-full h-1 dark:bg-gray-700">
          {/* Dynamic progress bar */}
          <motion.div
            className="bg-green-600 h-1 rounded-full"
            style={{ width: calculateWidth() }}
            initial={{ width: "20%" }}
            animate={{ width: calculateWidth() }}
            transition={{ type: "spring", stiffness: 100 }}
          />
        </div>
        <div className="ml-2 mt-2 flex items-center space-x-3">
          <button
            className={`p-1 flex border rounded-3xl pr-2 ${
              !showPreviewButton
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-400"
            }`}
            disabled={!showPreviewButton} // Disable button based on the condition
          >
            <BsSend className="mt-1" />
            <span className="ml-2">Send</span>
          </button>

          {showPreviewButton && (
            <button
              className="p-1 border rounded-3xl bg-blue-400"
              onClick={handlePreview}
            >
              <div className="flex">
                <div>
                  <TiEyeOutline className="mt-1" />
                </div>
                <div>
                  <span className="ml-1">Preview</span>
                </div>
              </div>
            </button>
          )}
        </div>
      </div>
      <div className="w-full md:w-[50%] flex flex-col md:flex-row">
        <div className="mt-5 lg:text-xl w-full md:w-auto hidden md:block">
          {/* Render SidebarItems for larger screens */}
          {sidebarLabels.map((label, index) => (
            <SidebarItem
              key={label}
              label={label}
              isActive={activeIndex === index}
              onClick={() => setActiveIndex(index)}
              renderContent={renderContent}
            />
          ))}
        </div>

        <div className="w-full md:w-[50%] mt-5 hidden md:block">
          {/* Render content for large screens */}
          {renderContent()}
        </div>

        <div className="block md:hidden w-full mt-5">
          {/* Render SidebarItems for small screens */}
          {sidebarLabels.map((label, index) => (
            <SidebarItem
              key={label}
              label={label}
              isActive={activeIndex === index}
              onClick={() => setActiveIndex(index)}
              renderContent={renderContent}
            />
          ))}
        </div>
      </div>
      <PreviewModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        activityData={activityData}
      />
    </>
  );
};

export default CreateActivity;
