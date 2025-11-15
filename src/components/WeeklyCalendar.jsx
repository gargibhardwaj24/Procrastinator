import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function WeeklyCalendar() {
  const today = new Date();

  // offset: 0 = current week, +1 = next week, -1 = previous week, etc.
  const [weekOffset, setWeekOffset] = useState(0);

  const days = ["S", "M", "T", "W", "T", "F", "S"];

  // Calculate dates for the selected week
  const getWeekDates = () => {
    const current = new Date();
    current.setDate(current.getDate() + weekOffset * 7);

    const week = [];
    const firstDay = current.getDate() - current.getDay(); // Sunday

    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(current);
      nextDate.setDate(firstDay + i);
      week.push(nextDate);
    }

    return week;
  };

  const weekDates = getWeekDates();

  // Month name based on middle day of the week
  const monthName = weekDates[3].toLocaleString("default", { month: "long" });
  const year = weekDates[3].getFullYear();

  // Check if a date is today
  const isToday = (dateObj) =>
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear();

  return (
    <div className="p-4 bg-green-600/20 rounded-xl w-[26.5%] flex flex-col gap-4">

      {/* ⭐ MONTH HEADER WITH ARROWS */}
      <div className="flex justify-between items-center px-2">
        <button
          className="p-2 bg-green-950/75 text-white rounded-full hover:bg-green-800"
          onClick={() => setWeekOffset(weekOffset - 1)}
        >
          <FaChevronLeft />
        </button>

        <h2 className="text-xl font-bold text-green-900">
          {monthName} {year}
        </h2>

        <button
          className="p-2 bg-green-950/75 text-white rounded-full hover:bg-green-800"
          onClick={() => setWeekOffset(weekOffset + 1)}
        >
          <FaChevronRight />
        </button>
      </div>

      <div className="flex gap-2 w-full justify-between">
        {days.map((day, index) => (
          <div
            key={index}
            className={`px-2 py-2 rounded-full text-[14px] font-semibold text-center w-full border
              ${
                isToday(weekDates[index])
                  ? "bg-green-950/75 text-white w-fit border-green-950/75"
                  : "bg-white border-green-950/75"
              }`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="flex gap-2 w-full justify-between">
        {weekDates.map((dateObj, index) => (
          <div
            key={index}
            className={`px-2 py-2 rounded-full text-center w-full border
              ${
                isToday(dateObj)
                  ? "bg-green-950/75 text-white border-green-900"
                  : "bg-white border-green-950/75"
              }`}
          >
            {dateObj.getDate()}
          </div>
        ))}
      </div>

    </div>
  );
}
