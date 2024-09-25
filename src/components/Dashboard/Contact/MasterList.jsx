import { useEffect, useState } from "react";
import { clientAPI } from "../../../api/axios-api.js";
import { SHOWLIST_ROUTE } from "../../../api/constants.js";
import { GrEdit } from "react-icons/gr";
import { PiEraserDuotone } from "react-icons/pi";

const MasterList = () => {
  const [showList, setShowList] = useState([]);

  const masterListAPI = async () => {
    const Id = localStorage.getItem("auth_token");
    try {
      const temp = { userId: Id };
      const response = await clientAPI.post(SHOWLIST_ROUTE, temp, {
        withCredentials: true,
      });
      setShowList(response.data.client);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    masterListAPI();
  }, []);

  return (
    <>
      {console.log(showList)}
      <div>
        <table className="table-fixed border p-2">
          <thead>
            <tr className="border">
              <th className="p-1 px-10">Name</th>
              <th className="p-1 px-10">Email</th>
              <th className="p-1 px-10">Phone</th>
              <th className="p-1 px-10">Blocklisted</th>
              <th className="p-1 px-10">Action</th>
            </tr>
          </thead>
          {showList.map((list) => (
            <tbody key={list.Phone}>
              <tr className="border">
                <td className="p-1 px-10">{list.Name}</td>
                <td className="p-1 px-10">{list.Email}</td>
                <td className="p-1 px-10">{list.Phone}</td>
                <td className="p-1 px-10"></td>
                <tr className="flex">
                  <td className="p-1 ">
                    <button className="flex">
                      <GrEdit className="text-xs mt-2 mr-1" />
                      <span className="">Edit</span>
                    </button>
                  </td>
                  <td className="p-1 ">
                    <button className="flex">
                      <PiEraserDuotone className="mt-1 mr-1" />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
};

export default MasterList;
