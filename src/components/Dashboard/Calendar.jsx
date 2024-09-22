import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

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
    console.log(date);
  };

  return (
    <>
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
              className={
                day
                  ? isSameDay(day, new Date())
                    ? "bg-orange-500 p-2"
                    : "hover:bg-blue-300 p-2"
                  : "p-2  "
              }
              style={{ cursor: "pointer" }}
              type="button"
              onClick={() => handleClick(day)}
            >
              {day ? day.getDate() : ""}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Calendar;
