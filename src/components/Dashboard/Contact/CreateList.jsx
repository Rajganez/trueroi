import { useRef, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import ExcelPic from "../../../assets/excelPic.png";
import { clientAPI } from "../../../api/axios-api.js";
import { ADDLIST_ROUTE, FILE_UPLOAD_ROUTE } from "../../../api/constants.js";
import { CgSpinner } from "react-icons/cg";
import { motion } from "framer-motion";

const CreateList = () => {
  const intialState = {
    name: "",
    email: "",
    phone: "",
  };
  const [formData, setFormData] = useState(intialState);
  //   const [bulkUpload, setBulkUpload] = useState("");
  const [error, setError] = useState("");
  const [showSampleFormat, setSampleFormat] = useState(false);
  const [emailError, setEmailListError] = useState("");
  const [phoneError, setPhoneListError] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [SuccessMsg, setSuccessMsg] = useState(false);

  const fileRef = useRef();

  const processFile = async (file) => {
    const id = localStorage.getItem("auth_token")
    if (file) {
      const formData = new FormData();
      const originalFileName = file.name;
      const modifiedFileName = originalFileName.replace(/\s+/g, "_");
      formData.append("file", file, modifiedFileName);
      formData.append("userId", id);
      try {
        // const formData = new FormData(); // Create a FormData object
        // formData.append("file", bulkUpload);
        //   const temp = { userId: Id, file: bulkUpload };
        const response = await clientAPI.post(FILE_UPLOAD_ROUTE, formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
      //   setBulkUpload(formData); // Set the file data in the bulk upload state
    }
  };

  const handleAttachment = () => {
    try {
      const file = fileRef.current.files[0];
      processFile(file);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    processFile(file);
    // bulkFileUploadAPI();
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactListAPI = async () => {
    const id = localStorage.getItem("auth_token");
    try {
      const tempData = { ...formData, userId: id };
      const response = await clientAPI.post(ADDLIST_ROUTE, tempData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setPhoneListError("");
        setEmailListError("");
        setShowSpinner(false);
        setError("");
        setFormData(intialState);
        setSuccessMsg(!SuccessMsg);
      }
    } catch (error) {
      setShowSpinner(false);
      if (error.status === 400) {
        setEmailListError(error.response.data.msg);
        setPhoneListError("");
      } else if (error.status === 401) {
        setPhoneListError(error.response.data.msg);
        setEmailListError("");
      } else if (error.status === 402) {
        setPhoneListError(error.response.data.msg);
        setEmailListError(error.response.data.msg);
      }
    }
  };

  //   const bulkFileUploadAPI = async () => {
  //     // const Id = localStorage.getItem("auth_token");
  //     try {
  //         // const formData = new FormData(); // Create a FormData object
  //         // formData.append("file", bulkUpload);
  //       //   const temp = { userId: Id, file: bulkUpload };
  //       const response = await clientAPI.post(FILE_UPLOAD_ROUTE, formData, {
  //         withCredentials: true,
  //       });
  //       console.log(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const handleListAddition = (e) => {
    e.preventDefault();
    const { name, email, phone } = formData;
    const loginMail = formData.email || "";
    const validEmailDomains = [".com", ".in", ".org", ".dev", ".co.in"];
    const emailDomainValid = validEmailDomains.some((domain) =>
      loginMail.endsWith(domain)
    );
    //Function to validate Name input
    const validateName = (name) => {
      const minNameLength = 5;
      const maxNameLength = 20;
      const minAlphaChars = 3;
      const maxNumericChars = 2;
      // Check the length
      if (name.length < minNameLength || name.length > maxNameLength) {
        return false;
      }
      // Count alphabetic and numeric characters
      const alphaCount = (name.match(/[a-zA-Z]/g) || []).length;
      const numericCount = (name.match(/[0-9]/g) || []).length;
      return alphaCount >= minAlphaChars && numericCount <= maxNumericChars;
    };
    if (!loginMail.includes("@") || !emailDomainValid) {
      setError("Enter a valid email");
      return;
    } else if (email === "" || phone === "") {
      setError("Email or Phone number are required");
      return;
    } else if (phone.length < 1 || phone.length > 10) {
      setError("Phone number must be between 1 and 10 digits");
      return;
    } else if (!validateName(name)) {
      setError(
        "Minimum 5 characters required and only 2 numeric characters allowed"
      );
      return;
    } else {
      contactListAPI();
    }
    if (error) {
      setShowSpinner(false);
    }
    setShowSpinner(true);
  };
  return (
    <div>
      {" "}
      <div className="mt-5 ml-5">
        <div>
          <form>
            <div className="lg:flex">
              <div>
                <label className="text-lg" htmlFor="name">
                  Name
                </label>
                <div>
                  <input
                    type="text"
                    id="name"
                    placeholder="John Doe"
                    className="p-2 m-2 border border-blue-400 rounded-xl"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
              <div>
                <label className="text-lg" htmlFor="email">
                  Email
                </label>
                <div>
                  <input
                    type="email"
                    id="email"
                    placeholder="john@customermail.com"
                    className="p-2 m-2 border border-blue-400 rounded-xl"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                  />
                  {emailError ? (
                    <div className="text-red-600 text-xs">{emailError}</div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div>
                <div className="items-center mt-2">
                  <label className="text-lg lg:ml-3" htmlFor="phone">
                    Phone
                  </label>
                  <div>
                    <span className="p-2 md:ml-2 ml-1 bg-gray-200 rounded-l-xl">
                      +91
                    </span>
                    <input
                      type="text"
                      id="phone"
                      placeholder="9988776655"
                      className="p-2 border border-blue-400 rounded-r-xl lg:w-[60%]"
                      inputMode="numeric"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      maxLength="10"
                    />
                    {phoneError ? (
                      <div className="text-red-600 text-xs">{phoneError}</div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="lg:mt-5">
                <motion.button
                  className="bg-green-700 flex text-white p-2 m-2 rounded-xl 
            hover:bg-green-800 lg:mt-3 mt-5 lg:ml-0 ml-20"
                  onClick={handleListAddition}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1.0 }}
                >
                  {showSpinner ? (
                    <CgSpinner className="mt-1 mx-1 animate-spin" />
                  ) : (
                    "Add to List"
                  )}
                </motion.button>
                {error && <div className="text-red-500 text-xs">{error}</div>}
                {SuccessMsg && !error && (
                  <span className="text-green-600 text-xs">Added</span>
                )}
              </div>
            </div>
          </form>
        </div>
        <div className="mt-5 text-xl">Bulk Upload &nbsp;</div>
        <div className="lg:flex">
          <div
            className="border-dotted border border-gray-300 shadow-sm lg:ml-20 mt-5 
            h-[12rem] lg:w-[60%]"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="ml-32 justify-center lg:mt-16 mt-16">
              <button onClick={handleUpload}>
                <FiUploadCloud className="text-4xl ml-5 text-slate-400" />
                <span className="ml-3">Upload</span>
              </button>
              <input
                type="file"
                hidden
                ref={fileRef}
                onChange={handleAttachment}
              />
              <div className="text-xs">(.xlsx,.txt,.csv)</div>
            </div>
          </div>
          <div className="lg:ml-16 lg:mt-10 ml-5 mt-5 lg:text-lg text-xs">
            Check the Sample Format{" "}
            <motion.button
              className="text-blue-700 hover:text-blue-900 underline"
              style={{ cursor: "pointer" }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.0 }}
              onClick={() => setSampleFormat(!showSampleFormat)}
            >
              Click here
            </motion.button>{" "}
            before uploading Email and Phone number together{" "}
          </div>
          {showSampleFormat && (
            <div className="absolute lg:right-10 lg:bottom-10 z-50 mt-5">
              <button
                className="p-1 text-lg text-red-800"
                onClick={() => setSampleFormat(false)}
              >
                [x] Close
              </button>
              <img src={ExcelPic} width={300} title="Sample Format" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateList;
