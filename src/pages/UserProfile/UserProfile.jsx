import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { motion } from "framer-motion";

import "./UserProfile.css";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import { allAvatars } from "../../components/Avatars/Avatars";
import { fromNow } from "../../utils";
import axios from "axios";

const UserProfile = () => {
  const { id } = useParams();

  const [currentProfile, setCurrentProfile] = useState();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(currentProfile?.name);
  const [email, setEmail] = useState(currentProfile?.email);
  const [biography, setBiography] = useState(currentProfile?.biography);
  const [avatarIndex, setAvatarIndex] = useState(currentProfile?.avatar);
  const [editswitch, setEditSwitch] = useState(false);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );

  const handleSubmit = async () => {
    setLoading(true);
    await axios
      .post("api/inquirer", {
        ...currentUser,
        name: name,
        biography: biography,
        avatar: avatarIndex,
        email: email,
        time: currentUser.time,
      })
      .then((res) => {
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        setCurrentProfile(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    setLoading(false);
    setEditSwitch(false);
  };

  const getUserProfile = async () => {
    setLoading(true);
    await axios
      .get(`api/inquirer/${id}`)
      .then((res) => {
        setCurrentProfile(res.data);
        setName(res.data.name);
        setBiography(res.data.biography);
        setAvatarIndex(res.data.avatar);
        setEmail(res.data.email);
      })
      .catch((err) => {
        console.error(err);
      });
    setLoading(false);
  };

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, [localStorage.getItem("currentUser")]);

  useEffect(() => {
    getUserProfile();
  }, [id]);

  return (
    <div className="home-container-1">
      <LeftSideBar />
      <div className="home-container-2">
        <div className="main-bar">
          <div className="profile-header">
            <h1 className="tags-h1">
              {editswitch ? "ویرایش پروفایل" : "پروفایل"}
            </h1>
            {currentUser && currentUser.id == currentProfile?.id && (
              <motion.button
                className="ask-btn"
                onClick={() => setEditSwitch((perv) => !perv)}
                style={{ marginLeft: "1.5rem" }}
                whileTap={{ scale: 0.95 }}
              >
                ویرایش پروفایل
              </motion.button>
            )}
          </div>

          {!editswitch ? (
            <div className="user-details">
              <img
                src={allAvatars[currentProfile?.avatar]}
                height="180px"
                alt=""
              />
              <div className="user-name">
                <h1 style={{ marginBottom: "0" }}>{currentProfile?.name}</h1>
                <h3 style={{ marginBottom: "0" }}>{currentProfile?.email}</h3>
                <p className="label" style={{ marginTop: "10px" }}>
                  {currentProfile?.biography}
                </p>
                <p className="label" style={{ marginTop: "10px" }}>
                  {"آخرین بار " + fromNow(moment(currentProfile?.time))}
                  {currentUser && currentUser.id == currentProfile?.id
                    ? " پروفایلتو آپدیت کردی :)"
                    : " پروفایلشو آپدیت کرده :)"}
                </p>
              </div>
            </div>
          ) : (
            <div>
              <form className="edit-profile-form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <label htmlFor="name" className="label">
                    <h3>نام</h3>
                  </label>
                  <input
                    type="text"
                    style={{ width: "93%" }}
                    className="normal-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label htmlFor="email" className="label">
                    <h3>ایمیل</h3>
                  </label>
                  <input
                    type="text"
                    style={{ width: "93%" }}
                    className="normal-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <label htmlFor="biography" className="label">
                    <h3>بیوگرافی</h3>
                  </label>
                  <input
                    type="text"
                    style={{ width: "93%" }}
                    className="normal-input"
                    value={biography}
                    onChange={(e) => setBiography(e.target.value)}
                  />
                </div>
                <div className="input-group" style={{ marginTop: "1em" }}>
                  <label htmlFor="avatar" className="label">
                    <h3>آواتار</h3>
                    <div className="avatar-container normal-input">
                      {allAvatars.map((avatar) => (
                        <motion.img
                          className={`${
                            avatarIndex == allAvatars.indexOf(avatar)
                              ? "active-avatar"
                              : ""
                          }`}
                          src={avatar}
                          alt=""
                          height="120px"
                          whileTap={{ scale: 1 }}
                          whileHover={{
                            scale: 1.05,
                          }}
                          key={allAvatars.indexOf(avatar)}
                          onClick={() =>
                            setAvatarIndex(allAvatars.indexOf(avatar))
                          }
                        />
                      ))}
                    </div>
                  </label>
                </div>
                <br />
                <div className="edit-profile-button">
                  <motion.button
                    type="button"
                    className="user-cancel-btn"
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setEditSwitch(false)}
                  >
                    صرف نظر
                  </motion.button>
                  <motion.input
                    whileTap={{ scale: 0.9 }}
                    type="submit"
                    value="ذخیره پروفایل"
                    className="user-submit-btn"
                  />
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
