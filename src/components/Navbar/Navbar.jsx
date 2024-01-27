import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import "./Navbar.css";
import logo from "../../assets/soalkonlogo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/");
  };

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, [localStorage.getItem("currentUser")]);

  return (
    <nav className="main-nav" data-scroll-section>
      <div className="navbar">
        <Link to="/" className="nav-btn">
          <img src={logo} alt="home logo" className="nav-logo" />
        </Link>
        {currentUser == null ? (
          <div className="flex">
            <motion.button
              className="nav-item nav-links new-btn"
              onClick={() => {
                navigate("/auth");
              }}
              whileTap={{ scale: 0.95 }}
              style={{ marginLeft: "10px" }}
            >
              ورود
              <div className="arrow-wrapper">
                <div className="arrow"></div>
              </div>
            </motion.button>
          </div>
        ) : (
          <div className="flex">
            <motion.button
              className="nav-item nav-links new-btn"
              onClick={() => handleLogout()}
              whileTap={{ scale: 0.95 }}
              style={{ marginLeft: "10px" }}
            >
              خروج
              <div className="arrow-wrapper">
                <div className="arrow"></div>
              </div>
            </motion.button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
