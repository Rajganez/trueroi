import { useEffect, useState } from "react";
import { clientAPI } from "../../../api/axios-api.js";
import { EMAIL_CAMPAIGN_DETAILS_ROUTE } from "../../../api/constants.js";

const ActivityList = () => {
  const [mailSendList, setMailSendList] = useState([]);

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
      console.error("Error fetching email campaign details:", error);
    }
  };

  useEffect(() => {
    emailCampaignDetails();
  }, []);

  return (
    <>
      <div className="overflow-x-auto overflow-y-auto w-full max-h-[400px]">
        <table className="min-w-full bg-white border p-2">
          <thead className="bg-gray-400">
            <tr className="border">
              <th className="p-2 px-10 sticky top-0 left-0 z-20 bg-gray-400">
                Activity Name
              </th>
              <th className="p-2 px-10 sticky top-0 left-0 z-20 bg-gray-400">
                Client Name
              </th>
              <th className="p-2 px-10 sticky top-0 z-10 bg-gray-400">Email</th>
              <th className="p-2 px-10 sticky top-0 z-10 bg-gray-400">Phone</th>
              <th className="p-2 px-10 sticky top-0 z-10 bg-gray-400">
                UnSubscribed
              </th>
            </tr>
          </thead>
          {mailSendList.map((list, ind) => {
            const sendToArray = JSON.parse(list.SendTo);
            return (
              <tbody key={ind}>
                <tr className="border">
                  <td className="p-1 px-10 sticky left-0 z-10 bg-white">
                    {list.Activity}
                  </td>
                  <td>
                    {sendToArray.map((recipient, idx) => (
                      <span key={idx}>
                        {Object.keys(recipient)[0]}
                        {idx < sendToArray.length - 1 && ", "}
                      </span>
                    ))}
                  </td>
                  <td>
                    {sendToArray.map((recipient, idx) => (
                      <span key={idx}>
                        {Object.values(recipient)[0]}
                        {idx < sendToArray.length - 1 && ", "}
                      </span>
                    ))}
                  </td>
                  {/* <td className="p-1 px-10">{list.Phone}</td> */}
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default ActivityList;
