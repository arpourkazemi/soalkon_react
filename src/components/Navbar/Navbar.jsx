import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import "./Navbar.css";
import logo from "../../assets/soalkonlogo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, [localStorage.getItem("currentUser")]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/");
  };

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <nav className="main-nav" data-scroll-section>
      <div className="navbar">
        <Link to="/" className="nav-btn">
          <img src={logo} alt="home logo" className="nav-logo" />
        </Link>
        {(location.pathname === "/" ||
          location.pathname === "/tags" ||
          location.pathname === "/questions" ||
          location.pathname.includes("/questionsoftag/")) && (
          <form
            className="form"
            onChange={handleSearch}
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="search" className="search-label">
              <input
                className="input"
                type="search"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                placeholder="جستجو..."
                id="search"
                name="search"
              />
              <div className="fancy-bg"></div>
              <div className="search">
                <lord-icon
                  src="https://cdn.lordicon.com/rlizirgt.json"
                  trigger="hover"
                  colors="primary:#3a3a3a"
                  style={{
                    width: "22px",
                    height: "22px",
                    margin: "5px",
                    paddingRight: "12px",
                  }}
                ></lord-icon>
              </div>
            </label>
          </form>
        )}
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
