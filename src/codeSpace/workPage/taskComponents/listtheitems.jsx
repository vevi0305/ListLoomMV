import { Routes, Route, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

export const ListTheItems = ({
  userTask,
  fetchErr,
  isLoading,
  checks,
  deletes,
}) => {
  const undoneTasks = userTask.filter((task) => !task.done);
  const doneTasks = userTask.filter((task) => task.done);

  const taskEdit = (e) => {
    console.log(e.target.dataset.value); // Access the value using the data attribute
  };

  return (
    <>
      {isLoading && (
        <p className="text-4xl text-center p-5">Loading Items...</p>
      )}
      {fetchErr && (
        <p className="text-4xl text-center p-5">{`Error : ${fetchErr} please refresh once..`}</p>
      )}
      {/* undoneTasks */}
      {!fetchErr && !isLoading && (
        <>
          <div className="pending tasks md:mx-auto mb-3 md:w-3/5 md:text-2xl text-xl p-2">
            {undoneTasks.length ? (
              <>
                <h1 className="mx-auto w-2/5 text-center border-b-2 pb-1 font-semibold">
                  Pending Tasks
                </h1>
                <ul className="flex flex-col ">
                  {undoneTasks.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-6 w-full  border-b-2"
                    >
                      <div className="md:pt-2 pt-2 border-r-2 h-full">
                        <input
                          onChange={() => checks(item.id, userTask)}
                          className="w-8 h-10 text-base "
                          type="checkbox"
                          name=""
                          id=""
                          checked={item.done}
                        />
                      </div>

                      <label
                        data-value={item.work} // Attach the value to the data attribute
                        style={
                          item.done ? { textDecoration: "line-through" } : null
                        }
                        className="text-center"
                        onDoubleClick={taskEdit}
                      >
                        {item.work}
                      </label>
                      <i
                        onClick={() => deletes(item.id, userTask)}
                        className="uil uil-trash text-3xl text-black hover:text-red-500"
                      ></i>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-2xl text-center p-5">You have an Empty list</p>
            )}
          </div>
        </>
      )}
      {/* Separate the tasks doneTasks */}
      <hr className="bg-white h-1 rounded-3xl" />

      {!fetchErr && !isLoading && (
        <>
          <div className="completed tasks md:mx-auto mb-3 md:w-3/5 md:text-2xl text-xl p-2">
            {doneTasks.length ? (
              <>
                <h1 className="mx-auto w-2/5 text-center border-b-2 pb-1 font-semibold">
                  Completed Tasks
                </h1>
                <ul className="flex flex-col ">
                  {doneTasks.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-6 w-full  border-b-2"
                    >
                      <div className="md:pt-2 pt-2 border-r-2 h-full">
                        <input
                          onChange={() => checks(item.id, userTask)}
                          className="w-8 h-10 text-base "
                          type="checkbox"
                          name=""
                          id=""
                          checked={item.done}
                        />
                      </div>

                      <label
                        data-value={item.work} // Attach the value to the data attribute
                        style={
                          item.done ? { textDecoration: "line-through" } : null
                        }
                        className="text-center"
                        onDoubleClick={taskEdit}
                      >
                        {item.work}
                      </label>
                      <i
                        onClick={() => deletes(item.id, userTask)}
                        className="uil uil-trash text-3xl text-black hover:text-red-500"
                      ></i>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-2xl text-center p-5">
                You have an Empty Completed Task.
              </p>
            )}
          </div>
        </>
      )}
    </>
  );
};
