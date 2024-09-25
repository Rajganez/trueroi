import { motion } from "framer-motion";
import { useState } from "react";
import CreateList from "./Contact/CreateList";
import MasterList from "./Contact/MasterList";

const Contacts = () => {
  const [showListCanvas, setShowListCanvas] = useState(false);

  const handleListCreation = () => {
    setShowListCanvas(!showListCanvas);
    // Logic to create list and using offcanvas
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
        <div>
          <CreateList />
        </div>
      ) : (
        <div className="mt-5 ml-5">
          <MasterList />
        </div>
      )}
    </>
  );
};

export default Contacts;
