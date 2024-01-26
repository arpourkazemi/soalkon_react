import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { motion } from "framer-motion";

import "./UserProfile.css";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import EditProfileForm from "./EditProfileForm";
import ProfileBio from "./ProfileBio";
import { allAvatars } from "../../Avatars/Avatars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake } from "@fortawesome/free-solid-svg-icons";
import { fromNow } from "../../utils";
import axios from "axios";

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState();
  const [currentProfile, setCurrentProfile] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, [localStorage.getItem("currentUser")]);

  const [editswitch, setEditSwitch] = useState(false); //edit profile useState

  const getUserProfile = async () => {
    setLoading(true);
    await axios
      .get(`api/inquirer/${id}`)
      .then((res) => {
        setCurrentProfile(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    setLoading(false);
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  useEffect(() => {
    console.log(currentProfile);
    console.log(id);
  }, [currentProfile]);

  return (
    <div className="home-container-1">
      <LeftSideBar />
      <div className="home-container-2">
        <div className="main-bar">
          <h1 className="tags-h1">پروفایل</h1>
          {currentProfile && currentProfile.id == id && (
            <motion.button
              className="ask-btn"
              onClick={() => setEditSwitch(true)}
              style={{ marginLeft: "1.5rem" }}
              whileTap={{ scale: 0.95 }}
            >
              ویرایش پروفایل
            </motion.button>
          )}

          <div className="user-details">
            <img
              src={allAvatars[currentProfile?.avatar]}
              style={{
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
              }}
              height="180px"
              alt=""
            />
            <div className="user-name">
              <h1 style={{ marginBottom: "0" }}>{currentProfile?.name}</h1>
              <h3 style={{ marginBottom: "0" }}>{currentProfile?.email}</h3>
              <p className="label" style={{ marginTop: "10px" }}>
                <FontAwesomeIcon
                  icon={faBirthdayCake}
                  style={{ marginRight: "2px" }}
                />{" "}
                اضافه شده {fromNow(moment(currentProfile?.time))}
              </p>
            </div>
          </div>
          {currentProfile && currentProfile.id == id && (
            <motion.button
              type="button"
              onClick={() => setEditSwitch(true)}
              className="edit-profile-btn cta"
              whileTap={{ scale: 0.95 }}
            >
              <svg
                viewBox="0 0 46 16"
                height="10"
                width="30"
                xmlns="http://www.w3.org/2000/svg"
                id="arrow-horizontal"
              >
                <path
                  transform="translate(30)"
                  d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                  data-name="Path 10"
                  id="Path_10"
                ></path>
              </svg>
              <span className="hover-underline-animation">ویرایش پروفایل</span>
            </motion.button>
          )}
        </div>
        <>
          {editswitch ? (
            <EditProfileForm
              currentUser={currentUser}
              setEditswitch={setEditSwitch}
            />
          ) : (
            currentProfile && <ProfileBio currentProfile={currentProfile} />
          )}
        </>
      </div>
    </div>
  );
};

export default UserProfile;
