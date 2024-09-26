import { useState } from "react";
import { motion } from "framer-motion";

const Signature = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  // Initial state for the editable fields
  const initialSignature = {
    name: "Your Name",
    designation: "Your Designation",
    company: "Your Company Name",
    email: "youremail@example.com",
    phone: "88385-39223",
  };

  // Load signature data from local storage or use the initial data
  const [signature, setSignature] = useState(
    JSON.parse(localStorage.getItem("signatureData")) || initialSignature
  );

  // Handle changes in editable fields
  const handleEdit = (field, value) => {
    setSignature((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Handle Save: stores the signature in local storage
  const handleSave = () => {
    localStorage.setItem("signatureData", JSON.stringify(signature));
    setShowSuccess(true);
  };

  return (
    <>
      <p className="text-sm font-semibold mb-4">
        Edit the Email Signature and Save
      </p>
      <div className="bg-gray-100 lg:w-[50rem] md:w-[25rem] lg:p-6 lg:mt-6">
        <div className="lg:max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden p-6">
          {/* Editable Signature Content */}
          <div className="text-gray-700 md:text-lg text-sm mb-4">
            <div
              contentEditable
              suppressContentEditableWarning
              className="font-bold mb-1"
              onBlur={(e) => handleEdit("name", e.target.innerText)}
            >
              {signature.name}
            </div>
            <div
              contentEditable
              suppressContentEditableWarning
              className="italic mb-1"
              onBlur={(e) => handleEdit("designation", e.target.innerText)}
            >
              {signature.designation}
            </div>
            <div
              contentEditable
              suppressContentEditableWarning
              className="mb-1"
              onBlur={(e) => handleEdit("company", e.target.innerText)}
            >
              {signature.company}
            </div>
            <div
              contentEditable
              suppressContentEditableWarning
              className="mb-1"
              onBlur={(e) => handleEdit("email", e.target.innerText)}
            >
              {signature.email}
            </div>
            <div
              contentEditable
              suppressContentEditableWarning
              className="mb-1"
              onBlur={(e) => handleEdit("phone", e.target.innerText)}
            >
              {signature.phone}
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="px-4 md:px-10 md:mt-3 ml-10  md:p-2 p-1 border rounded-3xl bg-green-600 
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
      </div>
    </>
  );
};

export default Signature;
