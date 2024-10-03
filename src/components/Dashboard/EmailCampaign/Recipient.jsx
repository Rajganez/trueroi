import { motion } from "framer-motion";
import { clientAPI } from "../../../api/axios-api.js";
import { SHOWLIST_ROUTE } from "../../../api/constants.js";
import { useEffect, useState } from "react";

const Recipient = () => {
  const [showList, setShowList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
  const [selectedEmails, setSelectedEmails] = useState([]); // State to store selected emails

  const [selectedList, setSelectedList] = useState(
    JSON.parse(localStorage.getItem("recipientMail")) || []
  );

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

  // Updated function to handle checkbox changes
  const handleCheckboxChange = (recipient) => {
    const emailObj = { [recipient.Name]: recipient.Email };

    // Check if the email object already exists in the selectedEmails array
    const emailExists = selectedEmails.some(
      (item) => item[recipient.Name] === recipient.Email
    );

    if (emailExists) {
      // Remove the email object if it already exists (uncheck scenario)
      setSelectedEmails(
        selectedEmails.filter(
          (item) => item[recipient.Name] !== recipient.Email
        )
      );
    } else {
      // Add the email object to the selectedEmails array (check scenario)
      setSelectedEmails([...selectedEmails, emailObj]);
    }
  };

  const handleSave = () => {
    // Convert the selectedEmails array to a JSON string and store in localStorage
    localStorage.setItem("recipientMail", JSON.stringify(selectedEmails));
    setSelectedList(selectedEmails); // Update selectedList state to trigger re-render
    setIsModalVisible(false); // Close modal after saving
  };

  // Optional: If you need to listen for changes in localStorage (in case it's updated elsewhere)
  useEffect(() => {
    const updateSelectedList = () => {
      const recipientMail = JSON.parse(localStorage.getItem("recipientMail"));
      if (recipientMail) {
        setSelectedList(recipientMail);
      }
    };

    // Listen for changes to localStorage
    window.addEventListener("storage", updateSelectedList);

    return () => {
      window.removeEventListener("storage", updateSelectedList);
    };
  }, []);

  return (
    <>
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
              <h2 className="text-xl font-bold mb-4 text-center">
                Recipient List
              </h2>
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
                          onChange={() => handleCheckboxChange(recipient)}
                          checked={selectedEmails.some(
                            (item) => item[recipient.Name] === recipient.Email
                          )}
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

      {/* Display selected list after saving */}
      {selectedList && selectedList.length > 0 && (
        <div className="mt-5">
          <table className="w-[30rem] overflow-y-scroll bg-white border p-2">
            <thead className="bg-gray-400">
              <tr className="border">
                <th className="p-2 px-10 bg-gray-400">S.No</th>
                <th className="p-2 px-10 bg-gray-400">Name</th>
                <th className="p-2 px-10 bg-gray-400">Email</th>
              </tr>
            </thead>
            {selectedList.map((list, ind) => {
              const key = Object.keys(list)[0]; // Get the first key of the object
              const value = list[key]; // Get the value associated with the key

              return (
                <tbody key={value}>
                  <tr className="border">
                    <td className="p-1 px-10 sticky left-0 z-10 bg-white">
                      {ind + 1}
                    </td>
                    <td className="p-1 px-10 sticky left-0 z-10 bg-white">
                      {key}
                    </td>
                    <td className="p-1 px-10">{value}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      )}
    </>
  );
};

export default Recipient;
