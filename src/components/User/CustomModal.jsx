import PropTypes from "prop-types";

const CustomModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h5 className="text-xl font-medium">Confirmation</h5>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-500"
            onClick={onCancel}
          >
            <span className="sr-only">Close</span>
          </button>
        </div>
        <div className="px-6 py-4">
          <p>{message}</p>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 mr-2"
            onClick={onCancel}
          >
            Stay
          </button>
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={onConfirm}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

CustomModal.propTypes = {
  message: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

export default CustomModal;
