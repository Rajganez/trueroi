import { useEffect, useState } from "react";
import { clientAPI } from "../../api/axios-api.js";

import BarChart from "../Chart/BarChart";
import {
  EMAIL_CAMPAIGN_DETAILS_ROUTE,
  GET_TESTIMONIAL,
  SHOWLIST_ROUTE,
  USER_DETAILS_ROUTE,
} from "../../api/constants.js";

const UserDashboard = () => {
  const [userName, setUserName] = useState("");
  const [listCount, setListCount] = useState(0);
  const [activityCount, setActivityCount] = useState(0);
  const [unSubscribedCount, setUnSubscribedCount] = useState(0);
  const [clientTestimonialCount, setTestimonialCount] = useState(0);
  const [error, setError] = useState("");

  const userid = localStorage.getItem("auth_token");
  const temp = { userId: userid };

  const getUserDetailsAPI = async () => {
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
      setError(error.response.data.msg);
      console.error("Failed to get user details", error);
    }
  };

  const listCountAPI = async () => {
    try {
      const response = await clientAPI.post(SHOWLIST_ROUTE, temp, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setListCount(response.data.client.length);
        setError("");
      }
    } catch (error) {
      setError(error.response.data.msg);
    }
  };

  const emailCampaignDataAPI = async () => {
    const temp1 = { userID: userid };
    try {
      const response = await clientAPI.post(
        EMAIL_CAMPAIGN_DETAILS_ROUTE,
        temp1,
        { withCredentials: true }
      );
      if (response.status === 200) {
        const activityCount = response.data.map((val) => val.Activity.length);
        const unSubscribedCount = response.data.map(
          (val) => val.UnsubscribedMail.length
        );
        setActivityCount(...activityCount);
        setUnSubscribedCount(...unSubscribedCount);
        setError("");
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.msg);
    }
  };

  const getTestimonialAPI = async () => {
    try {
      const response = await clientAPI.post(GET_TESTIMONIAL, temp, {
        withCredentials: true,
      });
      if (response.status === 200) {
        if(response.data.testimonials.testimonial){
          const testimonialCount = response.data.testimonials.testimonial.length;
          setTestimonialCount(testimonialCount)
        }
      }
    } catch (error) {
      console.error("Failed to get testimonials", error);
    }
  }

  useEffect(() => {
    getUserDetailsAPI();
    listCountAPI();
    emailCampaignDataAPI();
    getTestimonialAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="mx-5 lg:text-4xl text-2xl text-blue-950">
        Welcome {userName}
      </div>
      <hr className="mt-5" />
      <div className="md:w-[40rem]">
        <BarChart
          contact={listCount}
          sentMail={activityCount}
          UnsubscribedMail={unSubscribedCount}
          Testimonial={clientTestimonialCount}
        />
        {error && <div className="">{error}</div>}
      </div>
    </>
  );
};

export default UserDashboard;
