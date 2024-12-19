import { Routes, Route, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import { AppUI } from "./App UI";
import Apirequest from "./ApiRequest";
import dayjs from "dayjs";
export const Todolist = () => {
  const API_URL = "http://localhost:2305/users";

  // App Introduction

  const [home, setHome] = useState(true);

  // Listing the task
  const [lists, setLists] = useState([]);

  // inserting new items
  const [newitem, setNewitem] = useState("");
  // for searching the task
  const [search, setSearch] = useState("");
  // errors
  const [fetchErr, setFetcherr] = useState(null);
  // for loading process
  const [isLoading, setIsloading] = useState(true);
  // For Sign in and Sign out process
  const [action, setAction] = useState("");
  // Logged in process
  const [logged, setLogged] = useState("Signed Out");
  // for Profile credentials
  const [fullName, setFullName] = useState("");
  const [firstLetter, setFirstLetter] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [credentials, setCredentials] = useState("");
  const [uservalidate, setUservalidate] = useState("");
  const [passvalidate, setPassvalidate] = useState("");
  const [namevalidate, setNamevalidate] = useState("");

  // for Profile visibility
  const [visible, setVisible] = useState(false);
  const [go, setGo] = useState("Task");

  const [Cal, setCal] = useState("hidden");

  // display parts

  // console.log(logged);
  // Task values

  const [show, setShow] = useState("hidden");

  // API Process and session process
  const USER_SESSION_KEY = "todolist_user";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Data not found...");
        const listItems = await response.json();
        setLists(listItems);
        setFetcherr(null);
      } catch (err) {
        setFetcherr(err.message);
      } finally {
        setIsloading(false);
      }
    };

    const storedUser = sessionStorage.getItem(USER_SESSION_KEY);

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setLogged("Signed In");
      setFirstLetter(parsedUser.fullName.charAt(0));
      setFullName(parsedUser.fullName);
      setUsername(parsedUser.username);
      setHome(false);
    }

    fetchData();
  }, []);

  // Code Space
  // Login Submit Process
  const handleSubmit = ({ fullName, username, password }) => {
    // validate username and password
    const usernameRegex = /^[a-z0-9_]{5,}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[&@_!])[A-Za-z\d&@_!.]{8,}$/;

    if (fullName.length > 2 && action === "Sign Up") {
      if (usernameRegex.test(username)) {
        if (passwordRegex.test(password)) {
          const searchUser = lists.find(
            (user) =>
              user.fullName === fullName &&
              user.username === username &&
              user.password === password
          );
          if (!searchUser) {
            addUser(fullName, username, password);
            setNamevalidate("");
            setUservalidate("");
            setPassvalidate("");
            setCredentials("");
            window.location.reload();
            setHome(false);
          } else {
            setCredentials(`${username} is already registered.`);
            setPassword("");
            setUsername("");
          }
        } else {
          setPassvalidate(
            "Invalid password format. It should contain one capital letter, one small letter, one number, and special characters (&@_!.), with a minimum length of 8."
          );
          setPassword("");
        }
      } else {
        setUservalidate(
          "Invalid username format. It should contain only small letters, numbers, and _ with a minimum length of 5."
        );
        setUsername("");
      }
    } else {
      setCredentials("Please Fill all the details.");
      setFullName("");
    }
  };

  // adding login values

  const addUser = async (fullName, username, password) => {
    try {
      const id = lists.length ? lists[lists.length - 1].id + 1 : 1;
      const newUser = {
        id,
        username,
        fullName,
        password,
        status: "Signed Out",
        lists: [],
        tasks: [],
      };

      const logPostOpt = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newUser),
      };

      const result = await Apirequest(API_URL, logPostOpt);

      if (result) setFetcherr(result);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Login process
  const handleLogin = async (username, password) => {
    if (action === "Sign In") {
      const matchedUser = lists.find(
        (user) => user.username === username && user.password === password
      );
      // console.log(matchedUser);
      if (matchedUser) {
        if (
          username === matchedUser.username &&
          password === matchedUser.password
        ) {
          setFirstLetter(matchedUser.fullName.charAt(0));
          setFullName(matchedUser.fullName);
          setLogged("Signed In");
          logUpt(matchedUser.id);
          setUsername(matchedUser.username);
          setCredentials("");
          setHome(false);

          // Store user in session storage
          const userToStore = {
            id: matchedUser.id,
            username: matchedUser.username,
            fullName: matchedUser.fullName,
          };

          sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(userToStore));
        }
      } else {
        setCredentials("Invalid password or username.");
        setUsername("");
        setPassword("");
      }
    }
  };

  // Updating the Looged user in db
  const logUpt = async (id) => {
    const listItems = lists.map((item) =>
      item.id === id ? { ...item, status: "Signed In" } : item
    );
    setLists(listItems);
    const uptID = listItems.filter((item) => item.id === id);
    //now update in json
    const loguptOpt = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ status: uptID[0].status }),
    };
    const urlId = `${API_URL}/${id}`;
    const result = await Apirequest(urlId, loguptOpt);
    if (result) setFetcherr(result);
  };
  // console.log("sign actions", action);
  // Logout Process
  const handleLogout = async (username, logged) => {
    setAction("Sign In");
    if (action === "Sign In" || logged === "Signed In") {
      const matchedUser = lists.find((user) => user.username === username);

      if (username === matchedUser.username) {
        sessionStorage.removeItem(USER_SESSION_KEY);
        setLogged("Signed Out");
        uptLogOut(matchedUser.id);
        setUsername("");
        setPassword("");
      } else {
        console.log("username not found");
      }
    }
  };
  // update logout process in db
  const uptLogOut = async (id) => {
    const listItems = lists.map((item) =>
      item.id === id ? { ...item, status: "Signed Out" } : item
    );
    setLists(listItems);
    const uptID = listItems.filter((item) => item.id === id);
    //now update in json
    const loguptOpt = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ status: uptID[0].status }),
    };
    const urlId = `${API_URL}/${id}`;
    const result = await Apirequest(urlId, loguptOpt);
    if (result) setFetcherr(result);
  };

  //  Sign in up out process done

  // *******************************************************/
  // Task work Process

  const addItems = async (username, work) => {
    if (action === "Sign In") {
      // Entry timings
      const data = dayjs();

      const matchedUser = lists.find((user) => user.username === username);
      if (matchedUser) {
        if (username === matchedUser.username) {
          const userTask = matchedUser.tasks;
          const ID = matchedUser.id;
          const id = userTask.length ? userTask[userTask.length - 1].id + 1 : 1;
          const addNew = {
            id,
            work,
            done: false,
            date: data.format("YYYY-MM-DD"),
          };
          const taskItems = [...userTask, addNew];
          const listItems = lists.map((item) =>
            item.id === ID ? { ...item, tasks: taskItems } : item
          );
          setLists(listItems);
          const uptItem = listItems.filter((item) => item.id === ID);

          const uptOpt = {
            method: "PATCH",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ tasks: uptItem[0].tasks }),
          };
          const urlId = `${API_URL}/${ID}`;
          const result = await Apirequest(urlId, uptOpt);
          if (result) setFetcherr(result);
        }
      } else {
        console.log("No user found");
      }
    }
  };

  let matchedUser = [];
  let userTask = [];

  if (action === "Sign In") {
    matchedUser = lists.find((user) => user.username === username);

    if (matchedUser) {
      userTask = matchedUser.tasks;
    }
  }

  // work done
  const checks = async (id, userTask) => {
    const ID = matchedUser.id;
    const taskItems = userTask.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item
    );
    const listItems = lists.map((item) =>
      item.id === ID ? { ...item, tasks: taskItems } : item
    );
    setLists(listItems);
    const uptItem = listItems.filter((item) => item.id === ID);
    const uptOpt = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ tasks: uptItem[0].tasks }),
    };
    const urlId = `${API_URL}/${ID}`;
    const result = await Apirequest(urlId, uptOpt);
    if (result) setFetcherr(result);
  };

  // deletes
  const deletes = async (id, userTask) => {
    const ID = matchedUser.id;
    const taskItems = userTask.filter((item) => item.id !== id);
    const listItems = lists.map((item) =>
      item.id === ID ? { ...item, tasks: taskItems } : item
    );
    setLists(listItems);
    const uptItem = listItems.filter((item) => item.id === ID);
    const uptOpt = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ tasks: uptItem[0].tasks }),
    };
    const urlId = `${API_URL}/${ID}`;
    const result = await Apirequest(urlId, uptOpt);
    if (result) setFetcherr(result);
  };

  // *******************************************************/

  // List work process

  // *******************************************************/

  // this code is for to block auto submit while searching
  const submitted = (e) => {
    e.preventDefault();
    addItems(username, newitem);
    setNewitem("");
  };
  // End code Space

  // Timings

  let greet;
  const [date, setTime] = useState(new Date());

  useEffect(() => {
    // Update the time every second
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId); // Clean up the interval on component unmount
    };
  }, []);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  const amOrPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  if (amOrPm === "PM") {
    if (hours !== 12) {
      hours += 12;
    }
    let hrmin = parseFloat(`${hours}.${minutes}`);
    if (hrmin >= 12.0 && hrmin < 15.0) {
      greet = `Good Afternoon, `;
    } else if (hrmin >= 15.0 && hrmin < 20.0) {
      greet = `Good Evening, `;
    } else if (hrmin >= 20.0 && hrmin < 23.0) {
      greet = `Good Night, `;
    } else {
      greet = `Hi, `;
    }
  } else {
    greet = `Good Morning, `;
  }
  //changing 24 to 12

  hours = hours % 12 || 12;
  let hrFormat = hours.toString().padStart(2, "0");
  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hrFormat}:${minutes}:${seconds} ${amOrPm}`;
  // end timings

  // Calendarwork
  // get dates in month

  const currentMonth = dayjs();
  const [today, setToday] = useState(currentMonth);
  const [selectDate, setSelectDate] = useState(currentMonth);

  //
  return (
    <div className="mx-auto h-screen bg-gray-200 rounded-md outline-none">
      <AppUI
        home={home}
        setHome={setHome}
        show={show}
        setShow={setShow}
        action={action}
        setAction={setAction}
        logged={logged}
        setLogged={setLogged}
        userTask={userTask.filter(
          (item) =>
            dayjs(item.date).format("YYYY-MM-DD") ===
            selectDate.format("YYYY-MM-DD")
        )}
        newitem={newitem}
        setNewitem={setNewitem}
        search={search}
        setSearch={setSearch}
        fetchErr={fetchErr}
        isLoading={isLoading}
        submitted={submitted}
        fullName={fullName}
        setFullName={setFullName}
        firstLetter={firstLetter}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        greet={greet}
        visible={visible}
        setVisible={setVisible}
        go={go}
        setGo={setGo}
        Cal={Cal}
        setCal={setCal}
        handleSubmit={handleSubmit}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        credentials={credentials}
        setCredentials={setCredentials}
        uservalidate={uservalidate}
        passvalidate={passvalidate}
        namevalidate={namevalidate}
        setUservalidate={setUservalidate}
        setPassvalidate={setPassvalidate}
        setNamevalidate={setNamevalidate}
        checks={checks}
        deletes={deletes}
        // calendar
        currentMonth={currentMonth}
        today={today}
        setToday={setToday}
        selectDate={selectDate}
        setSelectDate={setSelectDate}
      />
    </div>
  );
};
