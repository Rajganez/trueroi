import { useEffect, useState } from "react";
import { clientAPI } from "../../../api/axios-api";
import { GET_TESTIMONIAL } from "../../../api/constants";

const TestimonialList = () => {
  const [list, setList] = useState([]);
  const [apiError, setApiError] = useState("");

  const userid = localStorage.getItem("auth_token");

  const feedback = async () => {
    const temp = { userId: userid };
    try {
      const response = await clientAPI.post(GET_TESTIMONIAL, temp, {
        withCredentials: true,
      });
      if (response.status === 200) {
        if (response.data.testimonials.testimonial) {
          setList(response.data.testimonials.testimonial);
          setApiError("");
        }else if(!response.data.testimonials.testimonial){
          setApiError("No Testimonials Found!");
        }
      }
    } catch (error) {
      if (error.response) {
        setApiError(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    feedback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="overflow-x-auto overflow-y-auto w-full max-h-[400px] mt-5">
        <table className="min-w-full bg-white border p-2">
          <thead className="bg-gray-400">
            <tr className="border">
              <th className="p-2  bg-gray-400">Client Name</th>
              <th className="p-2 bg-gray-400">Email ID</th>
              <th className="p-2 px-10  bg-gray-400">Stars</th>
              <th className="p-2 px-10  bg-gray-400">Feedback</th>
            </tr>
          </thead>
          {apiError && <div className="text-red-500">{apiError}</div>}
          {list.map((val) =>
              <tbody key={val.clientEmail}>
                <tr>
                  <td>{val.clientName}</td>
                  <td>{val.clientEmail}</td>
                  <td>{val.ratings}</td>
                  <td>{val.feedBack}</td>
                </tr>
              </tbody>  
          )}
        </table>
      </div>
    </>
  );
};

export default TestimonialList;
