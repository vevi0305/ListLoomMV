import { Routes, Route, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ListTheItems } from "./taskComponents/listtheitems";
export const Taskwork = ({
  userTask,
  fetchErr,
  isLoading,
  checks,
  deletes,
}) => {
  return (
    <div className="mx-auto md:p-1">
      <ListTheItems
        userTask={userTask}
        fetchErr={fetchErr}
        isLoading={isLoading}
        checks={checks}
        deletes={deletes}
      />
    </div>
  );
};
