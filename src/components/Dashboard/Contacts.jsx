import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import ExcelPic from "../../assets/excelPic.png";
import { clientAPI } from "../../api/axios-api.js";
import { ADDLIST_ROUTE } from "../../api/constants.js";

const Contacts = () => {
  const [showListCanvas, setShowListCanvas] = useState(false);
  const intialState = {
    name:"",
    email: "",
    phone: "",
  };
  const [formData, setFormData] = useState(intialState);
  const [error, setError] = useState("");
  const [showSampleFormat, setSampleFormat] = useState(false);
  const [isFileDropped, setIsFileDropped] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fileRef = useRef();

  const handleListCreation = () => {
    setShowListCanvas(!showListCanvas);
    // Logic to create list and using offcanvas
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
      console.log(response.status);
    } catch (error) {
      console.log(error);
    }
  };

  const handleListAddition = (e) => {
    e.preventDefault();
    const loginMail = formData.email || "";
    const validEmailDomains = [".com", ".in", ".org", ".dev"];
    const emailDomainValid = validEmailDomains.some((domain) =>
      loginMail.endsWith(domain)
    );
    if (!loginMail.includes("@") || !emailDomainValid) {
      setError("Enter a valid email");
      return;
    } else if (formData.email === "" || formData.phone === "") {
      setError("Email or Phone number are required");
      return;
    } else if (formData.phone.length < 1 || formData.phone.length > 10) {
      setError("Phone number must be between 1 and 10 digits");
      return;
    } else {
      contactListAPI();
    }
  };

  const handleAttachment = () => {
    try {
      const file = fileRef.current.files[0];
      if (file) {
        setIsFileDropped(true);
        setUploading(false);
        const formData = new FormData();
        const originalFileName = file.name;
        const modifiedFileName = originalFileName.replace(/\s+/g, "_");
        formData.append("file", file, modifiedFileName);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    setIsFileDropped(file);
    setUploading(true);
  };
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <>
      <div className="flex justify-between mt-5">
        <div className="mx-5 lg:text-4xl text-2xl text-blue-950">Contacts</div>
        <div className="mx-2 lg:text-xl text-xs text-blue-950"></div>
      </div>
      <hr className="mt-5" />
      <div className="flex justify-between">
        <div className="mx-5 mt-5 lg:text-2xl text-xl">Your List</div>
        <div className="mx-2 mt-5">
          <motion.button
            className="bg-blue-900 lg:text-xl hover:bg-blue-950 rounded-full 
          text-white p-3"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            onClick={handleListCreation}
          >
            {showListCanvas ? "Back to List" : "Create List"}
          </motion.button>
        </div>
      </div>

      {/* <!-- drawer component --> */}
      {showListCanvas ? (
        <div className="mt-5 ml-5">
          <div>
            <form>
              <div className="lg:flex">
              <div>
                  <label className="text-lg" htmlFor="name">
                    Name
                  </label>
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
                <div>
                  <label className="text-lg" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="john@customermail.com"
                    className="p-2 m-2 border border-blue-400 rounded-xl"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <div className="flex items-center mt-2">
                    <label className="text-lg lg:ml-3" htmlFor="phone">
                      Phone
                    </label>
                    <span className="p-2 md:ml-2 ml-1 bg-gray-200 rounded-l-xl">
                      +91
                    </span>
                    <input
                      type="text"
                      id="phone"
                      placeholder="9988776655"
                      className="p-2 border border-blue-400 rounded-r-xl w-[60%]"
                      inputMode="numeric"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      maxLength="10"
                    />
                  </div>
                </div>
                <motion.button
                  className="bg-green-700 text-white p-2 m-2 rounded-xl 
                  hover:bg-green-800 lg:mt-0 mt-5 lg:ml-0 ml-20"
                  onClick={handleListAddition}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1.0 }}
                >
                  Add to List
                </motion.button>
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </form>
          </div>
          <div className="mt-5 text-xl">Bulk Upload &nbsp;</div>
          <div className="lg:flex">
            <div
              className="border-dotted border border-gray-300 shadow-sm lg:ml-20 
            mt-5 h-[12rem] lg:w-[60%]"
              onDrop={handleDrop}
              onDragOver={handleDrag}
            >
              <div className="ml-32 justify-center lg:mt-16 mt-16">
                <button onClick={handleUpload}>
                  <FiUploadCloud className="text-4xl ml-5 text-slate-400" />
                  <span className="ml-3">Upload</span>
                </button>
                <input
                  type="file"
                  className="hidden"
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
      ) : (
        <div className="mt-5 ml-5">
            <div className="">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
      )}
    </>
  );
};

export default Contacts;
