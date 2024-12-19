import { Routes, Route, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";

export const SignLogiIn = ({
  setHome,
  action,
  setAction,
  logged,
  setLogged,
  fullName,
  setFullName,
  username,
  setUsername,
  password,
  setPassword,
  handleSubmit,
  handleLogin,
  credentials,
  setCredentials,
  uservalidate,
  passvalidate,
  namevalidate,
  setUservalidate,
  setPassvalidate,
  setNamevalidate,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const passes = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="p-4 mt-32 md:mx-auto bg-slate-200 rounded-md md:w-2/5 text-center h-[75%] flex flex-col justify-between">
        {/* For Sign In and Out Buttons  */}
        <div>
          <div className="flex justify-between">
            <button
              className={
                action === "Sign In"
                  ? "bg-slate-400 text-white m-2 p-2 rounded-md font-semibold outline-none "
                  : "bg-blue-300 m-2 p-2 rounded-md font-semibold outline-none"
              }
              type="submit"
              onMouseMove={() => {
                setCredentials("");
                setAction("Sign Up");
                setUsername("");
                setPassword("");
                setFullName("");
                setUservalidate("");
                setPassvalidate("");
                setNamevalidate("");
              }}
            >
              Sign Up
            </button>
            <button
              className={
                action === "Sign Up"
                  ? "bg-slate-400 text-white m-2 p-2 rounded-md font-semibold outline-none "
                  : "bg-blue-300 m-2 p-2 rounded-md font-semibold outline-none"
              }
              type="submit"
              onMouseMove={() => {
                setCredentials("");
                setAction("Sign In");
                setUsername("");
                setPassword("");
                setFullName("");
                setUservalidate("");
                setPassvalidate("");
                setNamevalidate("");
              }}
            >
              Sign In
            </button>
          </div>
          <h1 className="text-2xl m-2">{action} here..👇🏼</h1>
        </div>
        <div>
          {/* full name */}
          {action === "Sign In" ? (
            <span className="text-base text-red-600">{credentials}</span>
          ) : (
            <>
              <>
                <span className="text-sm text-red-600">{credentials}</span>
                <span className="text-sm text-red-600">{namevalidate}</span>
                <br />
                <span className="text-sm text-red-600">{uservalidate}</span>
                <br />
                <span className="text-sm text-red-600">{passvalidate}</span>
              </>
              <input
                className="w-4/5 h-10 p-2 m-2 rounded-sm outline-none"
                type="text"
                name="Full name"
                id="fullName"
                required
                placeholder="Enter your Fullname.."
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </>
          )}
          {/* username */}
          {action === "Sign In" ? (
            <input
              className="w-4/5 h-10 p-2 m-2 rounded-sm outline-none"
              type="text"
              name="username"
              id="user"
              required
              placeholder="Enter your Username.."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          ) : (
            <input
              className="w-4/5 h-10 p-2 m-2 rounded-sm outline-none"
              type="text"
              name="username"
              id="user"
              required
              placeholder="Create your Username.."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}
          {/* password */}
          {action === "Sign In" ? (
            <div>
              <input
                className="w-[75%] h-10 p-2 m-2 rounded-sm outline-none"
                type={showPassword ? "text" : "password"}
                name="password"
                id="pass"
                required
                placeholder="Enter your Password.."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                onClick={passes}
                className={`text-xl uil ${
                  showPassword ? "uil-eye" : "uil-eye-slash"
                }`}
              ></i>
            </div>
          ) : (
            <div>
              <input
                className="w-[75%] h-10 p-2 m-2 rounded-sm outline-none"
                type={showPassword ? "text" : "password"}
                name="password"
                id="pass"
                required
                placeholder="Create your Password.."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                onClick={passes}
                className={`text-xl uil ${
                  showPassword ? "uil-eye" : "uil-eye-slash"
                }`}
              ></i>
            </div>
          )}
        </div>
        <div>
          <button
            className="text-2xl bg-blue-400 outline-none p-2 hover:shadow-md hover:shadow-neutral-400 transistion duration-300 rounded-md text-white"
            onClick={() => {
              handleSubmit({ fullName, username, password });
              handleLogin(username, password);
              setHome(false);
            }}
          >
            {action}
          </button>
        </div>
      </div>
    </div>
  );
};
