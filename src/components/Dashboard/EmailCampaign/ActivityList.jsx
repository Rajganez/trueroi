import { useEffect, useState } from "react";
import { clientAPI } from "../../../api/axios-api.js";
import { EMAIL_CAMPAIGN_DETAILS_ROUTE } from "../../../api/constants.js";

const ActivityList = () => {
  const [mailSendList, setMailSendList] = useState([]);
  const [apiError, setApiError] = useState("");

  const emailCampaignDetails = async () => {
    const user = localStorage.getItem("auth_token");
    const temp = { userID: user };
    try {
      const response = await clientAPI.post(
        EMAIL_CAMPAIGN_DETAILS_ROUTE,
        temp,
        {
          withCredentials: true,
        }
      );
      if (Array.isArray(response.data) && response.data.length > 0) {
        setMailSendList(response.data);
      } else {
        console.warn("No email campaign details found.");
      }
    } catch (error) {
      setApiError(error.response.data.msg);
    }
  };

  useEffect(() => {
    emailCampaignDetails();
  }, []);

  return (
    <>
      <div className="mt-5 overflow-x-auto overflow-y-auto w-full max-h-[400px]">
        <table className="min-w-full border-collapse border-slate-400 bg-white border p-2">
          <thead className="bg-gray-400 border border-slate-400">
            <tr className=" border border-slate-400">
              <th className="p-2 px-10 border border-slate-400 sticky top-0 left-0 z-20 bg-gray-400">
                Activity Name
              </th>
              <th className="p-2 px-10 border border-slate-400 sticky top-0 left-0 z-20 bg-gray-400">
                Client Name
              </th>
              <th className="p-2 px-10 border border-slate-400 sticky top-0 z-10 bg-gray-400">Email</th>
              <th className="p-2 px-10 border border-slate-400 sticky top-0 z-10 bg-gray-400">
                UnSubscribed
              </th>
            </tr>
          </thead>
          {apiError && <div className="text-red-500">{apiError}</div>}
          {mailSendList.map((list, ind) => {
            const sendToArray = Array.isArray(list.SendTo)
              ? list.SendTo.map((val) => JSON.parse(val))
              : [];
            const unsubscribedEmails = list.UnsubscribedMail || []; // Get unsubscribed emails

            return (
              <tbody key={ind} className="border border-slate-400">
                {list.Activity.map((activity, activityIndex) => (
                  <tr className=" border border-slate-400" key={activityIndex}>
                    {/* Activity Name */}
                    <td>
                      <div className="p-1 px-10 sticky left-0 z-10 bg-white">
                        {activity}
                      </div>
                    </td>

                    {/* Client Names */}
                    <td className=" border border-slate-400">
                      <div className="p-1">
                        {sendToArray[activityIndex].map((item, index) => (
                          <div key={index}>
                            <span className="font-semibold">
                              {Object.keys(item)[0]}
                            </span>{" "}
                            {/* Name */}
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Emails */}
                    <td className="border border-slate-400">
                      <div className="p-1">
                        {sendToArray[activityIndex].map((item, index) => (
                          <div key={index}>
                            <span>{Object.values(item)[0]}</span> {/* Email */}
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Unsubscribed */}
                    <td className="border border-slate-400">
                      <div className="p-1">
                        {sendToArray[activityIndex].map((item, index) => {
                          const email = Object.values(item)[0];
                          const isUnsubscribed = unsubscribedEmails.includes(email);
                          return (
                            <div key={index}>
                              {isUnsubscribed ? (
                                <span className="text-red-500">Yes</span>
                              ) : (
                                <span className="text-green-500">No</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default ActivityList;
