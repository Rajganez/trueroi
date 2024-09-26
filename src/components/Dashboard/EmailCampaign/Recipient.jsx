import { motion } from "framer-motion";
import { clientAPI } from "../../../api/axios-api.js";
import { SHOWLIST_ROUTE } from "../../../api/constants.js";
import { useState } from "react";

const Recipient = () => {
  const [showList, setShowList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
  const [selectedEmails, setSelectedEmails] = useState([]); // State to store selected emails

  const userid = localStorage.getItem("auth_token");

  const showListAPI = async () => {
    const temp = { userId: userid };
    try {
      const response = await clientAPI.post(SHOWLIST_ROUTE, temp, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setShowList(response.data.client);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleList = () => {
    showListAPI();
    setIsModalVisible(true); // Show modal
  };

  const handleCheckboxChange = (email) => {
    if (selectedEmails.includes(email)) {
      setSelectedEmails(selectedEmails.filter((item) => item !== email));
    } else {
      setSelectedEmails([...selectedEmails, email]);
    }
  };

  const handleSave = () => {
    localStorage.setItem("recipientMail", selectedEmails);
    console.log("Selected Emails:", selectedEmails);
    setIsModalVisible(false); // Close modal after saving
  };

  return (
    <div className="md:mt-20 mt-2 md:ml-10 md:w-[20rem]">
      <div className="md:flex">
        <div className="md:text-xl md:p-2 p-1">Select From the List</div>
        <div className="md:ml-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="px-4 md:p-2 p-1 border rounded-3xl bg-green-600 
            hover:bg-green-700 text-white"
            onClick={handleList}
          >
            Your List
          </motion.button>
        </div>
      </div>

      {/* Modal for Recipient List */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white rounded-lg shadow-lg p-5 w-full max-w-3xl overflow-y-auto max-h-[80vh]"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <h2 className="text-xl font-bold mb-4 text-center">Recipient List</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr className="w-full">
                  <th className="text-left p-2 border">Select</th>
                  <th className="text-left p-2 border">Name</th>
                  <th className="text-left p-2 border">Email</th>
                  <th className="text-left p-2 border">Phone</th>
                </tr>
              </thead>
              <tbody>
                {showList.map((recipient, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="p-2 border text-center">
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange(recipient.Email)}
                        checked={selectedEmails.includes(recipient.Email)}
                      />
                    </td>
                    <td className="p-2 border">{recipient.Name}</td>
                    <td className="p-2 border">{recipient.Email}</td>
                    <td className="p-2 border">{recipient.Phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setIsModalVisible(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Recipient;
