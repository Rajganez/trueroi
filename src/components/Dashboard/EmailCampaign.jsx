import { useState } from "react";

const EmailCampaign = () => {
  const [createStrategy, setCreateStrategy] = useState(false);
  return (
    <>
      <div className="flex justify-between mt-10">
        <div className="mx-5 lg:text-4xl text-2xl text-blue-950">
          Email Campaigns
        </div>
        <div className="mx-2 lg:text-xl text-xs text-blue-950">
          <button
            className="hover:bg-[#9222fb] bg-[#b066f6] rounded-full p-2"
            onClick={() => setCreateStrategy(!createStrategy)}
          >
            {createStrategy ? "Send Email" : "Save as Draft"}
          </button>
        </div>
      </div>
      <div className="mx-5 mt-5 lg:text-2xl text-xl">
        List of Email Activity
      </div>
      {!createStrategy ? (
        <>
          <div className="w-[20%] flex">
            <div>
              <div className="text-2xl mx-5 mt-5">Recipient</div>
              <div className="text-2xl mx-5 mt-5">Subject</div>
              <div className="text-2xl mx-5 mt-5">Message</div>
              <div className="text-2xl mx-5 mt-5">Signature</div>
            </div>
            <div className="w-[80%] border-2">
                <div className="mt-5">

                </div>
            </div>
          </div>
        </>
      ) : (
        <div className="mx-2 p-2">
          <table className="table-fixed">
            <thead>
              <tr>
                <th className="p-2">Name of the Activity</th>
                <th className="p-2">Activity Date</th>
                <th className="p-2">Sent</th>
                <th className="p-2">Recipient</th>
                <th className="p-2">Unsubscribed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Offer 20% Notification</td>
                <td>Aug 26,2024</td>
                <td>60</td>
                <td>52</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Offer 20% Notification</td>
                <td>Aug 26,2024</td>
                <td>60</td>
                <td>52</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Offer 20% Notification</td>
                <td>Aug 26,2024</td>
                <td>60</td>
                <td>52</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default EmailCampaign;
