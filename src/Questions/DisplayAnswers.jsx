import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { motion } from "framer-motion";
import { gsap } from "gsap";

import { allAvatars } from "../Avatars/Avatars";
import { fromNow, toFarsiNumber } from "../utils";
import axios from "axios";

import deleteIcon from "../assets/trash-solid.svg";

const DisplayAnswers = ({ question, setQuestion }) => {
  const getSingleQuestion = async () => {
    setLoading(true);
    await axios
      .get(`api/question/${question.id}/details`)
      .then((res) => {
        setQuestion(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    setLoading(false);
  };

  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, [localStorage.getItem("currentUser")]);

  const handleDelete = async (answer) => {
    setLoading(true);
    await axios
      .delete(`api/answer/${answer.id}`)
      .then((res) => {
        getSingleQuestion();
      })
      .catch((err) => {
        console.error(err);
      });
    setLoading(false);
  };

  const handleAccept = async (answer) => {
    setLoading(true);
    await axios
      .post("api/answer", {
        id: answer.id,
        body: answer.body,
        is_accepted: true,
        time: answer.time,
        question_id: answer.question_id,
        inquirer_id: answer.inquirer.id,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    setLoading(false);
  };

  const buyQuestion = async () => {
    if (!currentUser) {
      alert("این عملیات نیازمند ورود به سیستم است");
    }
  };

  useEffect(() => {
    gsap.fromTo(
      ".display-ans",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        stagger: 0.15,
      }
    );
  }, []);

  return (
    <div>
      {question?.answers?.map((ans) => (
        <div
          className="display-ans"
          style={{
            alignSelf: "flex-end",
            borderRight: ans.is_accepted
              ? "1.5rem solid green"
              : "1.5rem solid white",
          }}
          key={ans._id}
        >
          {ans.is_accepted && (
            <h4 style={{ color: "green" }}>پاسخ تایید شده</h4>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {currentUser &&
            (question?.inquirer.id === currentUser.id ||
              ans?.inquirer.id === currentUser.id) ? (
              <p>{ans.body}</p>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgb(225, 225, 225)",
                    display: "flex",
                    flexDirection: "column",
                    width: "70%",
                    alignItems: "center",
                    borderRadius: "1rem",
                    padding: "1rem",
                  }}
                >
                  <p>شما مجاز به دیدن پاسخ این سوال نیستید.</p>
                  <p>برای دیدن پاسخ ابتدا سوال را خریداری کنید.</p>
                  <motion.button
                    className="delete-btn"
                    style={{ backgroundColor: "#009dff" }}
                    onClick={() => {
                      buyQuestion();
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {`مشاهده تمام پاسخ های این سوال به مبلغ ${toFarsiNumber(
                      question?.price
                    )} ریال`}
                  </motion.button>
                </div>
              </div>
            )}
            {currentUser &&
              question?.inquirer.id === currentUser.id &&
              !ans.is_accepted && (
                <motion.button
                  className="delete-btn"
                  style={{ backgroundColor: "green" }}
                  onClick={() => {
                    handleAccept(ans);
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  تایید کردن پاسخ
                </motion.button>
              )}
            {currentUser && ans?.inquirer.id === currentUser.id && (
              <motion.button
                className="delete-btn"
                onClick={() => {
                  handleDelete(ans);
                }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={deleteIcon}
                  alt="upvote"
                  style={{
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                />
                حذف کردن پاسخ
              </motion.button>
            )}
          </div>
          <div className="question-actions-user">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p style={{ color: "gray", fontSize: ".875em" }}>
                ارسال شده {fromNow(moment(ans?.time))}
              </p>
              <Link
                to={`/user/${ans?.inquirer?.id}`}
                className="user-link"
                style={{ color: "#0086d8", alignSelf: "flex-end" }}
              >
                {ans?.inquirer?.name}
                <motion.div whileTap={{ scale: 0.9 }}>
                  {question?.userPosted}
                </motion.div>
                <img
                  className="avatar-image"
                  src={allAvatars[ans?.inquirer.avatar]}
                  height="35px"
                  alt=""
                />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayAnswers;
