import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { EMAIL_CAMPAIGN_DETAILS_ROUTE } from "../../api/constants.js";
import { clientAPI } from "../../api/axios-api.js";

const dayOfWeeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [markedDates, setMarkedDates] = useState([]);
  const [dateData, setDateData] = useState([]); // State to store email campaign details
  const [selectedActivities, setSelectedActivities] = useState([]); // State to store activities for the selected date

  const user = localStorage.getItem("auth_token");

  const emailCampaignDetails = async () => {
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
        const dates = response.data.map((item) => {
          const sentOnDates = item.SentOn.map((dateString) => {
            const [datePart] = dateString.split(", "); // Only take the date part
            const [day, month, year] = datePart.split("/").map(Number); // Convert to numbers
            return new Date(year, month - 1, day); // Create a Date object
          });
          return { activities: item.Activity, dates: sentOnDates }; // Store both activities and dates
        });
        // Set the marked dates state with only unique dates
        setMarkedDates([...new Set(dates.flatMap((item) => item.dates))]); // Flatten and remove duplicates
        setDateData(dates); // Set complete date data for reference
      } else {
        console.warn("No email campaign details found.");
        setMarkedDates([]);
        setDateData([]);
      }
    } catch (error) {
      console.error("Error fetching email campaign details:", error);
    }
  };

  useEffect(() => {
    emailCampaignDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dayInMonth = () => {
    const daysArr = [];
    const firstDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    );
    const lastDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    );

    for (let i = 0; i < firstDay.getDay(); i++) {
      daysArr.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      daysArr.push(
        new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i)
      );
    }

    return daysArr;
  };

  const handleChangeMonth = (e) => {
    const newMonth = parseInt(e.target.value, 10);
    setSelectedDate(new Date(selectedDate.getFullYear(), newMonth, 1));
  };

  const handleChangeYear = (e) => {
    const newYear = parseInt(e.target.value, 10);
    setSelectedDate(new Date(newYear, selectedDate.getMonth(), 1));
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const handleClick = (date) => {
    if (!date) return;

    // Clear previous activities
    setSelectedActivities([]);

    // Filter activities for the selected date from dateData
    const activitiesForDate = dateData.reduce((acc, item) => {
      item.dates.forEach((itemDate, index) => {
        if (isSameDay(itemDate, date)) {
          acc.push(item.activities[index]); // Push the activity corresponding to the date
        }
      });
      return acc;
    }, []);

    setSelectedActivities(activitiesForDate);
  };

  return (
    <div className="lg:flex">
      {/* Calendar Component */}
      <div className="lg:w-96 md:w-[28rem] w-screen bg-slate-100 md:m-2 md:p-2 m-1 p-1 shadow-lg">
        <div className="flex justify-between align-middle md:p-2 p-1">
          <button
            onClick={() =>
              setSelectedDate(
                new Date(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth() - 1,
                  1
                )
              )
            }
          >
            <FaAngleLeft />
          </button>
          <select
            value={selectedDate.getMonth()}
            className="md:text-xl text-xs p-1 border rounded-lg"
            onChange={handleChangeMonth}
          >
            {months.map((month, ind) => (
              <option key={ind} value={ind}>
                {month}
              </option>
            ))}
          </select>
          <select
            className="md:text-xl text-xs p-1 border rounded-lg"
            value={selectedDate.getFullYear()}
            onChange={handleChangeYear}
          >
            {Array.from(
              { length: 10 },
              (_, i) => selectedDate.getFullYear() - 5 + i
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <button
            onClick={() =>
              setSelectedDate(
                new Date(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth() + 1,
                  1
                )
              )
            }
          >
            <FaAngleRight />
          </button>
        </div>
        <div className="grid grid-cols-7 text-center md:text-lg text-xs md:p-2 md:my-2 p-1 my-1">
          {dayOfWeeks.map((day) => (
            <div className="md:py-1 md:mx-2" key={day}>
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 md:gap-3 gap-1 md:p-2 md:my-2">
          {dayInMonth().map((day, ind) => (
            <div
              key={ind}
              className={`relative p-2 ${day ? "cursor-pointer" : ""} ${
                day && isSameDay(day, new Date())
                  ? "bg-orange-500"
                  : day &&
                    markedDates.some((markedDay) => isSameDay(day, markedDay))
                  ? "bg-blue-200"
                  : "hover:bg-blue-300"
              }`}
              onClick={() => day && handleClick(day)}
            >
              {day ? day.getDate() : ""}
              {/* Show the green dot if the date is in markedDates */}
              {day &&
                markedDates.some((markedDay) => isSameDay(day, markedDay)) && (
                  <div
                    className="absolute bottom-0 right-5 h-2 w-2 bg-green-500 rounded-full"
                    style={{ margin: "2px" }}
                  ></div>
                )}
            </div>
          ))}
        </div>
      </div>

      {/* Activity Details Component */}
      <div className="lg:flex flex-col lg:w-96 w-full bg-gray-100 p-4 m-2 shadow-lg">
        <h2 className="text-lg font-semibold mb-2">Activities</h2>
        {selectedActivities.length > 0 ? (
          selectedActivities.map((activity, index) => (
            <div key={index} className="p-2 bg-white mb-2 rounded-lg shadow">
              <p>
                <strong>Activity:</strong> {activity}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Select a date to see activities.</p>
        )}
      </div>
    </div>
  );
};

export default Calendar;
