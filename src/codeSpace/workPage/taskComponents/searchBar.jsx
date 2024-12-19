import { Routes, Route, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

export const SearchBar = ({ search, setSearch }) => {
  return (
    <form className="mx-auto p-2 w-[90%]" onSubmit={(e) => e.preventDefault()}>
      <input
        className="mt-1 mx-auto w-full h-10 p-3 bg-white text-black text-2xl outline-none border-[1px] border-white rounded-2xl  flex flex-grow"
        type="text"
        role="searchBar"
        id=""
        placeholder="Search Items.."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};
