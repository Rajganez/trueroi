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
        } else if (!response.data.testimonials.testimonial) {
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
        <table className="min-w-full bg-white border-collapse border border-slate-400 p-2">
          <thead className="bg-gray-400">
            <tr>
              <th className="p-2 border border-slate-500 bg-gray-400">Client Name</th>
              <th className="p-2 border border-slate-500 bg-gray-400">Email ID</th>
              <th className="p-2 border border-slate-500 px-10 bg-gray-400">Stars</th>
              <th className="p-2 border border-slate-500 px-10 bg-gray-400">Feedback</th>
            </tr>
          </thead>
          {apiError && <div className="text-red-500">{apiError}</div>}
          {list.map((val) => (
            <tbody key={val.clientEmail}>
              <tr className="border border-slate-500">
                <td className="p-2 border border-slate-500">{val.clientName}</td>
                <td className="p-2 border border-slate-500">{val.clientEmail}</td>
                <td className="p-2 border border-slate-500">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((starIndex) => (
                      <span
                        key={starIndex}
                        className={`cursor-pointer text-3xl ${
                          starIndex <= val.ratings ? "text-yellow-500" : "text-gray-400"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-2 border border-slate-500">{val.feedBack}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
};

export default TestimonialList;
