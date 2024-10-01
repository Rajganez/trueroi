import PropTypes from "prop-types";
import { motion } from "framer-motion";

const PreviewMessage = ({ showModal, onClose, activityData }) => {
  if (!showModal) return null; // Don't render the modal if it's not visible

  // Destructure the activityData object
  const { smsActivityName, smsMessageData, toPhone } = activityData;

  const phoneData = () => {
    const phone = JSON.parse(toPhone);
    const name = Object.values(phone);
    return name.map((val, index) => {
      return (
          <p key={index} className=" text-gray-700 text-sm lg:text-lg flex-none inline-block">
            {Object.keys(val)} - &nbsp;{Object.values(val)},&nbsp;
          </p>
      );
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center 
    justify-center z-50 px-2"
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg p-5 w-full max-w-3xl lg:max-w-4xl overflow-y-auto h-[85vh] lg:h-[90vh]"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        <h2 className="text-xl font-bold mb-2 text-center">
          Message Preview for {smsActivityName}
        </h2>
        <div className="overflow-y-auto">
          {/* Message Header */}
          <div className="max-w-4xl mx-auto bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden mb-6">
            {phoneData()}
            {/* Email Content */}
            <div className="p-4 lg:p-6">
              <p className="text-gray-700 mb-4 text-sm lg:text-lg leading-relaxed">
                {smsMessageData}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md w-full"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

PreviewMessage.propTypes = {
  showModal: PropTypes.bool,
  onClose: PropTypes.func,
  activityData: PropTypes.object, // Data object for preview content
};

export default PreviewMessage;
