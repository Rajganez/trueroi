import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ActivityName = () => {
  const [activityName, setActivityName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  // Set in local Storage using the function
  const handleSave = () => {
    if (activityName.length < 5 || activityName.length > 20) {
      setError("Activity name must be between 5 and 20 characters.");
      setShowSuccess(false); // Ensure that the "Saved" message is not shown
      return; // Exit the function without saving
    }
    setError(""); // Clear any previous errors
    localStorage.setItem("activityName", activityName);
    setShowSuccess(true);
  };

  useEffect(() => {
    const activity = localStorage.getItem("activityName");
    if (activity) {
      setActivityName(activity);
    }
  }, []);

  return (
    <div className="lg:mt-20 mt-2 md:ml-10 p-2">
      <div className="md:flex">
        <div className="p-1">
          <input
            className="lg:w-[20rem] md:p-2 p-1 pl-5 border rounded-3xl border-orange-500"
            placeholder="Enter Activity Name"
            type="text"
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
            maxLength={20} // Set the maximum length to 20 characters
            required
          />
          {error && (
            <div className="text-xs text-red-600 mt-1 animate-pulse">
              {error}
            </div>
          )}
        </div>
        <div className="p-1 md:ml-0 ml-16">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="px-4 md:px-10 md:p-2 p-1 border rounded-3xl bg-green-600 
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
    </div>
  );
};

export default ActivityName;
