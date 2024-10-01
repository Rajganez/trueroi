// import { useState } from "react";
// import BarChart from "../Chart/BarChart";
import { useEffect, useState } from "react";
import { clientAPI } from "../../api/axios-api.js";

import BarChart from "../Chart/BarChart";
import { USER_DETAILS_ROUTE } from "../../api/constants.js";

const UserDashboard = () => {
  const [userName, setUserName] = useState("");

  const userid = localStorage.getItem("auth_token");

  const getUserDetailsAPI = async () => {
    const temp = { userId: userid };
    try {
      const response = await clientAPI.post(USER_DETAILS_ROUTE, temp, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setUserName(response.data.userName);
      } else {
        console.log("Failed to get user details");
      }
    } catch (error) {
      console.error("Failed to get user details", error);
    }
  };

  useEffect(() => {
    getUserDetailsAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="mx-5 lg:text-4xl text-2xl text-blue-950">
        Welcome {userName}
      </div>
      <hr className="mt-5" />
      <div className="md:w-[40rem]">
        <BarChart />
      </div>
    </>
  );
};

export default UserDashboard;
