// SuccessModal.js
import PropTypes from 'prop-types';

const SuccessModal = ({ showModal, onClose }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-bold">Success!</h2>
        <p className="mt-4">Your email has been sent successfully.</p>
        <div className="mt-6 flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

SuccessModal.propTypes = {
  showModal: PropTypes.bool,
  onClose: PropTypes.func,
};

export default SuccessModal;
