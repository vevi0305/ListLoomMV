import { Routes, Route, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const AboutApp = ({ setHome, setAction }) => {
  const carouselContent = [
    {
      title: "Mobile-First Task Management",
      description:
        "ListLoom is your mobile companion for seamless task management. Designed with a mobile-first approach, it empowers users to effortlessly organize and complete their daily tasks directly from their smartphones, ensuring accessibility for everyone.",
    },
    {
      title: "Daily Work, No Compromise",
      description:
        "Elevate your productivity with ListLoom, a dedicated task management app focused on helping individuals conquer their daily goals. Whether you're on the go or at home, ListLoom ensures that your tasks are at your fingertips, making productivity a part of your daily routine.",
    },
    {
      title: "Your Personal Task Partner",
      description:
        "Experience the simplicity of ListLoom as it becomes your personal task partner. From quick task additions to comprehensive list management, ListLoom is designed to make task completion intuitive, making it the go-to app for those who aim to meet their daily objectives with ease.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
  };

  return (
    <div className="h-full">
      <div>
        <h1>About the App...</h1>
      </div>
      <div className=" bg-white h-[55%] overflow-y-auto m-1 p-2 hide-scrollbar scroll-smooth rounded-lg">
        <Slider {...settings}>
          {carouselContent.map((item, index) => (
            <div key={index}>
              <h1 className="text-cyan-600 font-serif">{item.title}</h1>
              <p className="m-3">{item.description}</p>
            </div>
          ))}
        </Slider>
      </div>
      <div className="signlogin text-center mt-2">
        <h1>
          Would you like to <br />
          <Link
            onClick={() => {
              setAction("Sign Up");
              setHome(false);
            }}
            className="text-xl text-indigo-600 font-serif"
            to="/sign-login"
          >
            Sign Up
          </Link>
          <br />
          or
          <br />
          <Link
            onClick={() => {
              setAction("Sign In");
              setHome(false);
            }}
            className="text-xl text-indigo-600 font-serif"
            to="/sign-login"
          >
            Sign In
          </Link>
        </h1>
      </div>
    </div>
  );
};
