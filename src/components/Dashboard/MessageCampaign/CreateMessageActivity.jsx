import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AiFillCaretRight } from "react-icons/ai";
import FullScreenLoader from "../EmailCampaign/FullScreenLoader";
import { TiEyeOutline } from "react-icons/ti";
import { BsSend } from "react-icons/bs";
import PreviewModal from "../EmailCampaign/PreviewModal";
import SmsActivity from "./SmsActivity";
import TosmsRecipient from "./TosmsRecipient";

const sidebarLabels = ["Activity Name", "To", "Message"];

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
  label: PropTypes.string,
  onClick: PropTypes.func,
  isActive: PropTypes.bool, // Added prop to indicate active item
  renderContent: PropTypes.func, // Function to render the content below the item
};
const MessageCampaign = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showPreviewButton, setShowPreviewButton] = useState(false);
  const [activityData, setActivityData] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMail, setSuccessMail] = useState(false);

  // Calculate the width based on the active index
  const calculateWidth = () => `${(activeIndex + 1) * 33.3}%`;

  // Check local storage values and set the visibility of the Preview button
  const checkLocalStorage = () => {
    const smsActivityName = localStorage.getItem("smsActivityName");
    const smsMessageData = localStorage.getItem("smsMessageData");
    const toPhone = localStorage.getItem("toPhone");

    // If all local storage values are not empty, show the Preview button
    if (smsActivityName && smsMessageData && toPhone) {
      setActivityData({
        smsActivityName,
        smsMessageData,
        toPhone,
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
        return <SmsActivity />;
      case "To":
        return <TosmsRecipient />;
      case "Message":
        return <h1>message</h1>;
      default:
        return <div>Welcome to the Email Campaign</div>;
    }
  };

  const handlePreview = () => {
    setShowModal(true);
  };

  return (
    <>
      {loading && (
        <FullScreenLoader isLoading={loading} setIsLoading={setLoading} />
      )}{" "}
      {/* Show loader when loading is true */}
      <div className="flex items-center">
        <div className="w-[80%] mt-5 bg-gray-200 rounded-full h-1 dark:bg-gray-700">
          {/* Dynamic progress bar */}
          <motion.div
            className="bg-green-600 h-1 rounded-full"
            style={{ width: calculateWidth() }}
            initial={{ width: "30%" }}
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
            // onClick={handleSendEmail}
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
        {/* Onclick of close the modal  */}
        {successMail && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
              <h2 className="text-lg font-bold">Success!</h2>
              <p className="mt-4">Your email has been sent successfully.</p>
              <div className="mt-6 flex justify-end">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => setSuccessMail(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}

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
      {/* Preview Modal */}
      <PreviewModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        activityData={activityData}
      />
    </>
  );
};

export default MessageCampaign;
