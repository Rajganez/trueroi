// import { useState } from "react";
// import BarChart from "../Chart/BarChart";

import BarChart from "../Chart/BarChart";

const UserDashboard = () => {
  // const users = [
  //   { year: 2016, CustomerList: 30 },
  //   { year: 2017, CustomerList: 60 },
  //   { year: 2018, CustomerList: 90 },
  //   { year: 2019, CustomerList: 120 },
  //   { year: 2020, CustomerList: 150 },
  //   { year: 2021, CustomerList: 180 },
  //   { year: 2022, CustomerList: 210 },
  // ];

  
  return (
    <>
      <div className="mx-5 lg:text-4xl text-2xl text-blue-950">
        Welcome Rajganesh
      </div>
      <hr className="mt-5" />
      <div className="md:w-[40rem]">
        <BarChart  />
      </div>
    </>
  );
};

export default UserDashboard;
