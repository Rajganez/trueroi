import PropTypes from "prop-types";
import { motion } from "framer-motion";

const PreviewModal = ({ showModal, onClose, activityData }) => {
  if (!showModal) return null; // Don't render the modal if it's not visible

  // Destructure the activityData object
  const {
    activityName,
    subjectName,
    signatureData,
    messageData, // Assuming messageData is a stringified JSON object
  } = activityData;

  // Parse the messageData JSON string into an object
  let messageContent = {};
  if (messageData) {
    try {
      messageContent = JSON.parse(messageData);
    } catch (error) {
      console.error("Failed to parse messageData", error);
    }
  }

  // Parse the signatureData JSON string into an object
  let signatureContent = {};
  if (signatureData) {
    try {
      signatureContent = JSON.parse(signatureData);
    } catch (error) {
      console.error("Failed to parse signatureData", error);
    }
  }

  // Destructure the message content object
  const {
    companyName = "N/A",
    greetingMessage = "N/A",
    leadMessage = "N/A",
    additionalMessage = "N/A",
    contactMessage = "N/A",
  } = messageContent;

  // Destructure the signature content object
  const {
    name = "N/A",
    designation = "N/A",
    company = "N/A",
    email = "N/A",
    phone = "N/A",
  } = signatureContent;

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
          Email Preview for {activityName}
        </h2>
        <h4 className="text-lg font-semibold mb-4 text-center">
          Subject: {subjectName}
        </h4>
        <div className="overflow-y-auto">
          {/* Email Header */}
          <div className="max-w-4xl mx-auto bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden mb-6">
            <div className="bg-green-500 p-4 lg:p-6 text-center">
              <h1 className="text-white text-lg lg:text-2xl font-bold">
                {companyName}
              </h1>
            </div>

            {/* Email Content */}
            <div className="p-4 lg:p-6">
              <h2 className="text-lg lg:text-2xl font-semibold mb-4">
                {greetingMessage}
              </h2>
              <p className="text-gray-700 mb-4 text-sm lg:text-lg leading-relaxed">
                {leadMessage}
              </p>
              <p className="text-gray-700 mb-4 text-sm lg:text-lg leading-relaxed">
                {additionalMessage}
              </p>
              <p className="text-gray-700 mt-4 text-sm lg:text-lg leading-relaxed">
                {contactMessage}
              </p>
            </div>

            {/* Email Signature */}
            <div className="p-4 lg:p-6 bg-white">
              <h4 className="font-semibold mb-2">Best Regards,</h4>
              <p className="text-sm lg:text-lg">{name}</p>
              <p className="text-sm lg:text-lg">{designation}</p>
              <p className="text-sm lg:text-lg">{company}</p>
              <p className="text-sm lg:text-lg">{email}</p>
              <p className="text-sm lg:text-lg">{phone}</p>
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

PreviewModal.propTypes = {
  showModal: PropTypes.bool,
  onClose: PropTypes.func,
  activityData: PropTypes.object, // Data object for preview content
};

export default PreviewModal;
