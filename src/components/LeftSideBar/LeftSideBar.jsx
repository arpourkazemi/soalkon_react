import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "./LeftSideBar.css";
import Question from "../../assets/question.png";
import Tags from "../../assets/Tags.png";
import Logout from "../../assets/log-out.png";
import { allAvatars } from "../../Avatars/Avatars";
import { toFarsiNumber } from "../../utils";

import tagIcon from "../../assets/tags-solid.svg";
import userIcon from "../../assets/user-solid.svg";
import aboutIcon from "../../assets/users-solid.svg";
import paymentIcon from "../../assets/credit-card-regular.svg";
import homeIcon from "../../assets/house-solid.svg";
import moneyIcon from "../../assets/money-bill-wave-solid.svg";

const LeftSideBar = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, [localStorage.getItem("currentUser")]);

  const updatedUser = JSON.parse(localStorage.getItem("UpdatedProfile"));

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("currentUser");
  };

  return (
    <div className={`left-sidebar ${"sidebar-open"}`} id="left-sidebar">
      <nav className="side-nav">
        {currentUser && (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <img
                  src={allAvatars[currentUser?.avatar]}
                  height="50px"
                  alt=""
                />
                <div className="user-name">
                  <h1 style={{ marginBottom: "0" }}>{currentUser?.name}</h1>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <img
                  src={moneyIcon}
                  alt="upvote"
                  style={{ width: "20px", height: "20px", cursor: "pointer" }}
                />
                <h4 style={{ paddingRight: "1rem" }}>
                  {`اعتبار حساب : ${toFarsiNumber(currentUser?.balance)} ریال`}
                </h4>
              </div>
            </div>
            <hr />
          </>
        )}
        <NavLink to="/" className="side-nav-links" activeclassname="active">
          <img
            src={homeIcon}
            alt="upvote"
            style={{
              width: "20px",
              height: "20px",
              cursor: "pointer",
              margin: "10px",
            }}
          />
          <p>صفحه اصلی</p>
        </NavLink>
        <NavLink
          to="/about"
          className="side-nav-links"
          activeclassname="active"
        >
          <img
            src={aboutIcon}
            alt="upvote"
            style={{
              width: "20px",
              height: "20px",
              cursor: "pointer",
              margin: "10px",
            }}
          />
          <p>درباره ما</p>
        </NavLink>
        <NavLink
          to="/questions"
          className="side-nav-links"
          activeclassname="active"
        >
          <img
            src={Question}
            alt="question-icon"
            height="20px"
            style={{ margin: "10px" }}
          />
          <p>سوالات</p>
        </NavLink>
        <NavLink to="/tags" className="side-nav-links" activeclassname="active">
          <img
            src={tagIcon}
            alt="upvote"
            style={{
              width: "20px",
              height: "20px",
              cursor: "pointer",
              margin: "10px",
            }}
          />
          <p>تگ ها</p>
        </NavLink>
        {currentUser && (
          <NavLink
            to={`/user/${currentUser?.id}`}
            className="side-nav-links"
            activeclassname="active"
          >
            <img
              src={userIcon}
              alt="upvote"
              style={{
                width: "20px",
                height: "20px",
                cursor: "pointer",
                margin: "10px",
              }}
            />
            <p>پروفایل</p>
          </NavLink>
        )}
        {currentUser && (
          <NavLink
            to={`/payment`}
            className="side-nav-links"
            activeclassname="active"
          >
            <img
              src={paymentIcon}
              alt="upvote"
              style={{
                width: "20px",
                height: "20px",
                cursor: "pointer",
                margin: "10px",
              }}
            />
            <p>پرداخت الکترونیکی</p>
          </NavLink>
        )}
        {currentUser && (
          <div
            onClick={handleLogout}
            className="side-nav-links"
            activeclassname="active"
          >
            <img
              src={Logout}
              alt="question-icon"
              height="20px"
              style={{ margin: "10px" }}
            />
            <p>خروج</p>
          </div>
        )}
      </nav>
    </div>
  );
};

export default LeftSideBar;
