import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from "date-fns";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasks, ] = useState({
    "2024-09-21": ["Meeting with team", "Doctor's appointment"],
    "2024-09-22": ["Project deadline", "Lunch with a friend"],
  });

  const handleDateClick = (date) => {
    setSelectedDate(format(date, "yyyy-MM-dd"));
  };

  const renderTasks = () => {
    if (selectedDate && tasks[selectedDate]) {
      return tasks[selectedDate].map((task, index) => (
        <li key={index} className="text-sm text-gray-700">
          {task}
        </li>
      ));
    } else {
      return <li className="text-sm text-gray-500">No tasks scheduled</li>;
    }
  };

  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const blankDays = Array(getDay(monthStart)).fill(null); // Fill blanks at the start of the month

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">September 2024 Calendar</h2>
      <div className="grid grid-cols-7 gap-2">
        {/* Weekday Headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <div key={index} className="text-center font-semibold">
            {day}
          </div>
        ))}

        {/* Blank days before the start of the month */}
        {blankDays.map((_, index) => (
          <div key={index}></div>
        ))}

        {/* Calendar Days */}
        {days.map((day) => (
          <button
            key={day}
            onClick={() => handleDateClick(day)}
            className={`p-2 text-center border border-gray-200 hover:bg-gray-100 ${
              format(day, "yyyy-MM-dd") === selectedDate ? "bg-blue-200" : ""
            }`}
          >
            {format(day, "d")}
          </button>
        ))}
      </div>

      {/* Task Modal */}
      {selectedDate && (
        <div className="mt-6 p-4 bg-white shadow-lg rounded-lg">
          <h3 className="text-lg font-bold mb-2">Tasks for {selectedDate}</h3>
          <ul>{renderTasks()}</ul>
          <button
            onClick={() => setSelectedDate(null)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Calendar;
