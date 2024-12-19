import { Routes, Route, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import { Listwork } from "./workPage/listwork";
import { Taskwork } from "./workPage/taskwork";

export const Content = ({
  go,
  setGo,
  userTask,
  fetchErr,
  isLoading,
  checks,
  deletes,
}) => {
  return (
    <div className="mx-auto flex flex-col justify-between">
      {go === "List" ? (
        <>
          <Listwork />
        </>
      ) : (
        <>
          <Taskwork
            userTask={userTask}
            fetchErr={fetchErr}
            isLoading={isLoading}
            checks={checks}
            deletes={deletes}
          />
        </>
      )}
    </div>
  );
};
