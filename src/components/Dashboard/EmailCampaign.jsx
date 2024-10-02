import { lazy, useState } from "react";
import { motion } from "framer-motion";
const ActivityList = lazy(() => import("./EmailCampaign/ActivityList"));
const CreateActivity = lazy(() => import("./EmailCampaign/CreateActivity"));

const EmailCampaign = () => {
  const [createStrategy, setCreateStrategy] = useState(false);
  return (
    <>
      <div className="flex justify-between mt-10">
        <div className="mx-5 lg:text-4xl text-2xl text-blue-950">
          Email Campaigns
        </div>
        <div className="mx-2 md:text-xl text-xs text-blue-950">
          <motion.button
            className="bg-blue-900 lg:text-xl hover:bg-blue-950 rounded-full 
          text-white p-3 shadow-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCreateStrategy(!createStrategy)}
          >
            {createStrategy ? "Back to Activities" : "Create Activity"}
          </motion.button>
        </div>
      </div>
      <div className="mx-5 mt-5 lg:text-2xl text-xl">
        Create Your Email Activity
      </div>
      {!createStrategy ? <ActivityList /> : <CreateActivity />}
    </>
  );
};

export default EmailCampaign;
