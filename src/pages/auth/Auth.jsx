import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

import "./auth.css";
import Loading from "../../components/Loading/Loading";
import icon from "../../assets/sklogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [flag, setFlag] = useState(false);

  const navigate = useNavigate();

  //to toggle password visibility
  const [toggleState, setToggleState] = useState(false);
  const toggleVisibility = () => {
    const passwordField = document.getElementById("password");
    if (passwordField.type === "password") {
      passwordField.type = "text";
      setToggleState(true);
    } else {
      passwordField.type = "password";
      setToggleState(false);
    }
  };

  //to check if a password contains atleast 8 characters including 1 character and 1 number
  const isValidText = (text) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(text);
  };

  const randomIndex = (n) => Math.floor(Math.random() * n);

  const handleSubmit = async (e) => {
    e.preventDefault(); //To prevent the default state of submitting a form which is page refresh and url change
    setFlag(false);
    if (!email) {
      alert("لطفا ایمیل خود را وارد کنید.");
    } else if (!password) {
      alert("لطفا گذرواژه خود را وارد کنید.");
    }
    if (isSignUp) {
      if (!name) {
        alert("لطفا نام خود را وارد کنید.");
      } else {
        if (!flag) {
          setLoading(true);
          await axios
            .post("api/inquirer", {
              name: name,
              email: email,
              password: password,
            })
            .then((res) => {
              localStorage.setItem("currentUser", JSON.stringify(res.data));
            })
            .catch((err) => {
              console.error(err);
            });
          setLoading(false);
        }
      }
    } else {
      setLoading(true);
      await axios
        .post("api/inquirer/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          localStorage.setItem("currentUser", JSON.stringify(res.data));
          navigate("/");
        })
        .catch((err) => {
          if (err.response.status === 404) {
            alert("حساب کاربری با این ایمیل موجود نیست");
          } else if (err.response.status === 403) {
            alert("نام کاربری یا رمز عبور اشتباه است");
          } else console.error(err);
        });
      setLoading(false);
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-container-2">
        <img src={icon} className="login-logo" alt="stack-overflow-icon" />
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="input-group">
              <label htmlFor="name" className="label">
                نام
              </label>
              <input
                type="text"
                className="email-input"
                name="name"
                id="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
          )}
          <div className="input-group" style={{ marginTop: "1em" }}>
            <label htmlFor="email" className="label">
              آدرس ایمیل
            </label>
            <input
              className="email-input"
              type="text"
              name="email"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div
            className="input-group"
            style={{ marginTop: "1em", marginBottom: "1em" }}
          >
            <label htmlFor="password" className="label">
              گذرواژه
            </label>
            <div className="password-div">
              <input
                className="email-input"
                type="password"
                name="password"
                autoComplete="off"
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {toggleState ? (
                <FontAwesomeIcon
                  className="password-eye"
                  icon={faEyeSlash}
                  onClick={toggleVisibility}
                />
              ) : (
                <FontAwesomeIcon
                  className="password-eye"
                  icon={faEye}
                  onClick={toggleVisibility}
                />
              )}
            </div>
          </div>
          {isSignUp && (
            <p className="label" style={{ fontSize: ".85em", marginTop: 0 }}>
              گذرواژه باید شامل ۸ کاراکتر دارای حداقل یک حرف و یک عدد باشد.
            </p>
          )}
          <motion.button
            type="submit"
            className="auth-btn"
            whileTap={{ scale: 0.95 }}
            whileHover={{
              boxShadow: "0px 29px 25px -4px rgba(150, 150, 150, 0.24)",
            }}
          >
            {loading ? <Loading /> : isSignUp ? "ثبت نام" : "ورود"}
          </motion.button>
        </form>
        <p className="label">
          {isSignUp ? "حساب کاربری دارید؟" : "حساب کاربری ندارید؟"}
          <button
            type="button"
            className="handleSwitch"
            onClick={() => {
              setIsSignUp(!isSignUp);
            }}
          >
            {isSignUp ? "ورود" : "ثبت نام"}
          </button>
        </p>
      </div>
    </section>
  );
};

export default Auth;
