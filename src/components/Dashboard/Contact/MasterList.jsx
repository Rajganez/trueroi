import { useEffect, useState } from "react";
import { clientAPI } from "../../../api/axios-api.js";
import {
  CONFIRM_DELETE_ROUTE,
  EDIT_CLIENT_ROUTE,
  SHOWLIST_ROUTE,
} from "../../../api/constants.js";
import { GrEdit } from "react-icons/gr";
import { PiEraserDuotone } from "react-icons/pi";
import { motion } from "framer-motion";

const MasterList = () => {
  const [showList, setShowList] = useState([]);
  const [showEditModal, setShowEditModal] = useState(null);
  const [error, setError] = useState(false);
  const [showEditSuccess, setShowEditSuccess] = useState("");
  const [ShowDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteInd, setDeleteInd] = useState({});
  const [apiError, setApiError] = useState("");

  const [formData, setFormData] = useState({ Name: "", Email: "", Phone: "" });

  const Id = localStorage.getItem("auth_token");

  const masterListAPI = async () => {
    try {
      const temp = { userId: Id };
      const response = await clientAPI.post(SHOWLIST_ROUTE, temp, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setShowList(response.data.client);
        setApiError("");
      }
    } catch (error) {
      if (error) {
        setApiError(error.response.data.msg);
      }
    }
  };

  const handleEdit = (name, email, phone, ind) => {
    setShowEditModal(true);
    setShowEditSuccess("");
    setFormData({ Name: name, Email: email, Phone: phone, Ind: ind });
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setShowEditSuccess("");
    setFormData({ Name: "", Email: "", Phone: "" });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const editClientAPI = async () => {
    try {
      const temp = { ...formData, userid: Id };
      const response = await clientAPI.post(EDIT_CLIENT_ROUTE, temp, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setShowEditSuccess("Updated One Row");
        setError(false);
        setTimeout(() => {
          setShowEditModal(false);
        }, 1000);
      }
    } catch (error) {
      if (error.status === 404) {
        setApiError(error.response.msg);
      } else if (error.status === 403) {
        setError(`${error.response.data.msg}`);
        setTimeout(() => {
          setError("");
        }, 1000);
      }
    }
  };

  const handleDelete = (Ind) => {
    setShowDeleteModal(true);
    setShowEditSuccess("");
    setDeleteInd({ ind: Ind, userId: Id });
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await clientAPI.post(CONFIRM_DELETE_ROUTE, deleteInd, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setShowEditSuccess("Deleted One Row");
        setTimeout(() => {
          setShowDeleteModal(false);
        }, 1000);
      }
      console.log(response.status);
    } catch (error) {
      if (error) {
        alert("Something went wrong. Please try again");
      }
    }
  };

  const handleSaveChanges = () => {
    // Add your logic to save the changes here
    const { Name, Email, Phone } = formData;
    const loginMail = formData.Email || "";
    const validEmailDomains = [".com", ".in", ".org", ".dev", ".co.in"];
    const emailDomainValid = validEmailDomains.some((domain) =>
      loginMail.endsWith(domain)
    );
    const isPhoneNumeric = /^\d+$/.test(Phone);
    //Function to validate Name input
    const validateName = (Name) => {
      const minNameLength = 5;
      const maxNameLength = 20;
      const minAlphaChars = 3;
      const maxNumericChars = 2;
      // Check the length
      if (Name.length < minNameLength || Name.length > maxNameLength) {
        return false;
      }
      // Count alphabetic and numeric characters
      const alphaCount = (Name.match(/[a-zA-Z]/g) || []).length;
      const numericCount = (Name.match(/[0-9]/g) || []).length;
      return alphaCount >= minAlphaChars && numericCount <= maxNumericChars;
    };

    if (!loginMail.includes("@") || !emailDomainValid) {
      setError("Enter a valid email");
      return;
    } else if (Email === "" && Phone === "") {
      setError("Email or Phone number are required");
      return;
    } else if (Phone.length < 1 && Phone.length > 10) {
      setError("Phone number must be between 1 and 10 digits");
      return;
    } else if (!validateName(Name)) {
      setError(
        "Minimum 5 characters required and only 2 numeric characters allowed"
      );
      return;
    } else if (!isPhoneNumeric) {
      setError("Phone number must contain only digits");
      return;
    } else {
      editClientAPI();
    }
  };

  useEffect(() => {
    masterListAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showEditSuccess]);

  return (
    <>
      <div className="overflow-x-auto overflow-y-auto w-full max-h-[400px]">
        <table className="min-w-full bg-white border p-2">
          <thead className="bg-gray-400">
            <tr className="border">
              <th className="p-2 px-10 sticky top-0 left-0 z-20 bg-gray-400">
                Name
              </th>
              <th className="p-2 px-10 sticky top-0 z-10 bg-gray-400">Email</th>
              <th className="p-2 px-10 sticky top-0 z-10 bg-gray-400">Phone</th>
              <th className="p-2 px-10 sticky top-0 z-10 bg-gray-400">
                UnSubscribed
              </th>
              <th className="p-2 px-10 sticky top-0 z-10 bg-gray-400">
                Action
              </th>
            </tr>
          </thead>
          {apiError && <div className="text-red-600">{apiError}</div>}
          {showList.map((list, ind) => (
            <tbody key={list.Phone}>
              <tr className="border">
                <td className="p-1 px-10 sticky left-0 z-10 bg-white">
                  {list.Name}
                </td>
                <td className="p-1 px-10">{list.Email}</td>
                <td className="p-1 px-10">{list.Phone}</td>
                <td className="p-1 px-10"></td>
                <tr className="flex">
                  <td className="p-1">
                    <button
                      className="flex"
                      onClick={() =>
                        handleEdit(list.Name, list.Email, list.Phone, ind)
                      }
                    >
                      <GrEdit className="text-xs mt-2 mr-1" />
                      <span className="">Edit</span>
                    </button>
                  </td>
                  <td className="p-1">
                    <button className="flex" onClick={() => handleDelete(ind)}>
                      <PiEraserDuotone className="mt-1 mr-1" />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              </tr>
            </tbody>
          ))}
        </table>
      </div>

      {/* Delete Modal */}
      {ShowDeleteModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6">
            <h3 className="text-xl font-semibold mb-4">
              Are You Sure You Want to Delete ?
            </h3>
            <div className="mb-4 flex justify-evenly">
              <div className="mt-2">
                <motion.button
                  className="bg-green-500 hover:bg-green-700 border p-2 rounded-2xl px-10"
                  whileHover={{ scale: 1.1 }}
                  onClick={handleConfirmDelete}
                >
                  Ok
                </motion.button>
              </div>
              <div className="mt-2">
                <motion.button
                  className="bg-slate-500 hover:bg-slate-600 border p-2 rounded-2xl px-10"
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setShowDeleteModal(false)}
                >
                  Close
                </motion.button>
              </div>
            </div>
            {showEditSuccess && (
              <div className="text-green-600 text-xs mt-2">
                {showEditSuccess}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6">
            <h2 className="text-xl font-semibold mb-4">Edit User</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="Name"
                  value={formData.Name}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone</label>
                <span className="p-2 ">+91</span>
                <input
                  type="text"
                  name="Phone"
                  inputMode="numeric"
                  value={formData.Phone}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md"
                  maxLength="10"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveChanges}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
              </div>
              {error && (
                <div className="text-red-500 text-xs mt-2">{error}</div>
              )}
              {showEditSuccess && (
                <div className="text-green-600 text-xs mt-2">
                  {showEditSuccess}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MasterList;
