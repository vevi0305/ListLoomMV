import { Routes, Route, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";

export const Inputlist = ({
  newitem,
  setNewitem,
  submitted,
  show,
  setShow,
}) => {
  const inputRef = useRef();

  return (
    <div className={show === "hidden" ? "hidden" : ""}>
      <div>
        <i
          onClick={() => {
            setShow("hidden");
          }}
          className="close text-3xl absolute top-[10%] left-[92%] uil uil-times-square hover:text-red-400"
        ></i>
      </div>
      <form onSubmit={submitted} className="w-[90%] flex p-1 border-b-2">
        <input
          className=" w-[70%] h-10 p-3 bg-white text-black text-xl outline-none  border-gray-400 rounded-sm placeholder-gray-400 flex flex-grow"
          autoFocus
          ref={inputRef}
          type="text"
          id="addItem"
          required
          placeholder="Add Task"
          value={newitem}
          onChange={(e) => setNewitem(e.target.value)}
        />
        <button
          className="mx-auto w-[15%] hover:bg-blue-600 transition duration-300 rounded-md text-black hover:text-white"
          type="submit"
        >
          <i
            onClick={() => {
              inputRef.current.focus();
            }}
            className="text-3xl uil uil-plus"
          ></i>
        </button>
      </form>
    </div>
  );
};
