import { useState } from "react";
import CreateMessageActivity from "./CreateMessageActivity";
import MessageActivityList from "./MessageActivityList";

const MessageCampaign = () => {
  const [createStrategy, setCreateStrategy] = useState(false);

  return (
    <>
      <div className="flex justify-between mt-10">
        <div className="mx-5 lg:text-4xl text-2xl text-blue-950">
          Message Campaigns
        </div>
        <div className="mx-2 md:text-xl text-xs text-blue-950">
          <button
            className="hover:bg-[#9222fb] bg-[#b066f6] rounded-full p-2"
            onClick={() => setCreateStrategy(!createStrategy)}
          >
            {createStrategy ? "Send Message" : "Back to messages"}
          </button>
        </div>
      </div>
      <div className="mx-5 mt-5 lg:text-2xl text-xl">
        Create Your Email Activity
      </div>
      {!createStrategy ? <CreateMessageActivity /> : <MessageActivityList />}
    </>
  );
};

export default MessageCampaign;
