import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

// import { getUpdatedUser, updateProfile } from "../../actions/users";
import { allAvatars } from "../../Avatars/Avatars";
import axios from "axios";

const EditProfileForm = ({ currentUser, setEditswitch }) => {
  const [name, setName] = useState(currentUser.name); //the default name will be the name entered at the time of signup
  const [biography, setBiography] = useState(currentUser.biography); //Will store the about text and send this to the backend server
  // const [tags, setTags] = useState(updatedUser?.result?.tags.join(" ")); //default as the string version of the 'tags' in the user details
  const [avatarIndex, setAvatarIndex] = useState(currentUser.avatar); //default index of the user's avatar
  const [loading, setLoading] = useState(false); //default index of the user's avatar

  //to update the user details
  // useEffect(() => {
  //   dispatch(getUpdatedUser(currentUser?.result._id));
  // }, [updatedUser]);

  //updated userProfile submit
  const handleSubmit = async () => {
    setLoading(true);
    await axios
      .post("api/inquirer", {
        ...currentUser,
        name: name,
        biography: biography,
        avatar: avatarIndex,
      })
      .then((res) => {
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        // console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    setLoading(false);

    setEditswitch(false);
  };

  return (
    <div>
      <h1 className="edit-profile-title">Edit Your Profile</h1>
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
          <div></div>
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
                    // boxShadow: "4px 47px 24px -9px rgba(150, 150, 150, 0.24)",
                  }}
                  key={allAvatars.indexOf(avatar)}
                  onClick={() => setAvatarIndex(allAvatars.indexOf(avatar))}
                />
              ))}
            </div>
          </label>
        </div>
        <br />
        <motion.input
          whileTap={{ scale: 0.9 }}
          type="submit"
          value="ذخیره پروفایل"
          className="user-submit-btn"
        />
        <motion.button
          type="button"
          className="user-cancel-btn"
          whileTap={{ scale: 0.9 }}
          onClick={() => setEditswitch(false)}
        >
          صرف نظر
        </motion.button>
      </form>
    </div>
  );
};

export default EditProfileForm;
