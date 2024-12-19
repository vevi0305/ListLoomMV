import { Routes, Route, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { openCalendar } from "./calendar components/opencalendar";

export const Calendar = ({
  currentMonth,
  today,
  setToday,
  selectDate,
  setSelectDate,
  setCal,
}) => {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];

  // display part

  // for multiple classNames
  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  const monthList = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div>
      <div className=" whole calendar flex flex-col gap-5 justify-between">
        <div className="month year next prev move flex justify-around">
          <button className="text-xl font-semibold">
            {monthList[today.month()]} - {today.year()}
          </button>
          <div className="flex gap-5">
            <i
              onClick={() => {
                setToday(today.month(today.month() - 1));
              }}
              className="uil uil-angle-left text-2xl cursor-pointer"
            ></i>
            <button
              onClick={() => {
                setToday(currentMonth);
              }}
              className="text-xl"
            >
              Today
            </button>
            <i
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
              className="uil uil-angle-right text-2xl cursor-pointer"
            ></i>
          </div>
        </div>
        <div className="weekdays grid grid-cols-7 gap-2 text-center text-gray-500 border-b-2 p-2">
          {weekDays.map((day, index) => (
            <button key={index}>{day}</button>
          ))}
        </div>
        <div className="calendars grid grid-cols-7 gap-2 text-center">
          {openCalendar(today.month(), today.year()).map(
            ({ date, currentMonth, today }, index) => {
              return (
                <div className="grid place-content-center" key={index}>
                  <button
                    className={classNames(
                      "w-10 h-10 rounded-full hover:bg-black hover:text-white transition-all",
                      currentMonth ? "text-xl " : "hidden",
                      today ? "bg-sky-500 text-white hover:text-blue-400" : "",
                      selectDate.toDate().toDateString() ===
                        date.toDate().toDateString()
                        ? "bg-black text-white"
                        : ""
                    )}
                    onClick={() => {
                      setSelectDate(date);
                      setTimeout(() => setCal("hidden"), 1000);
                    }}
                  >
                    {date.date()}
                  </button>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};
