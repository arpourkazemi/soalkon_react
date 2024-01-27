import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import moment from "moment-jalaali";
import { motion } from "framer-motion";

import deleteIcon from "../../assets/trash-solid.svg";
import upVoteIcon from "../../assets/circle-up-solid.svg";
import downVoteIcon from "../../assets/circle-down-solid.svg";

import "./Questions.css";
import DisplayAnswers from "./DisplayAnswers";
import { fromNow, toFarsiNumber } from "../../utils";
import axios from "axios";
import { allAvatars } from "../Avatars/Avatars";
import Loading from "../Loading/Loading";

const QuestionDetails = (props) => {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState("");
  const [upVotes, setUpVotes] = useState(0);
  const [downVotes, setDownVotes] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );

  const getSingleQuestion = async () => {
    setLoading(true);
    await axios
      .get(`api/question/${props.id}/details`)
      .then((res) => {
        setCurrentQuestion(res.data);
        setUpVotes(res.data.upvote);
        setDownVotes(res.data.downvote);
      })
      .catch((err) => {
        console.error(err);
      });
    setLoading(false);
  };

  const deleteQuestion = async () => {
    setLoading(true);
    await axios
      .delete(`api/question/${props.id}`)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
    setLoading(false);
  };

  const upVoteQuestion = async () => {
    setLoading(true);
    await axios
      .get(`api/question/${props.id}/upvote`)
      .then((res) => {
        setUpVotes(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    setLoading(false);
  };

  const downVoteQuestion = async () => {
    setLoading(true);
    await axios
      .get(`api/question/${props.id}/downvote`)
      .then((res) => {
        setDownVotes(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    setLoading(false);
  };

  const handlePostAnswer = async (e, answerLength) => {
    e.preventDefault();
    if (currentUser === null) {
      alert("برای پاسخ دادن ابتدا وارد شوید");
      navigate("/Auth");
    } else {
      if (answer === "") {
        alert("پاسخ نمیتواند خالی باشد");
      } else {
        setLoading(true);
        await axios
          .post("api/answer", {
            body: answer,
            question_id: currentQuestion.id,
            inquirer_id: currentUser.id,
            is_accepted: false,
          })
          .then((res) => {
            getSingleQuestion().then(() => {
              setAnswer("");
            });
          })
          .catch((err) => {
            console.error(err);
          });
        setLoading(false);

        setAnswer("");
      }
    }
  };

  useEffect(() => {
    getSingleQuestion();
  }, []);

  useEffect(() => {
    getSingleQuestion();
  }, []);

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, [localStorage.getItem("currentUser")]);

  return (
    <div className="question-details-page" data-scroll-section>
      {currentQuestion === null ? (
        <Loading />
      ) : (
        <div>
          <section className="question-details-container">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                {currentQuestion?.question_status === "NOT_SOLVED" ? (
                  <div className="question-status-not-solved">
                    <p className="status">حل نشده</p>
                  </div>
                ) : currentQuestion?.question_status === "IN_PROGRESS" ? (
                  <div className="question-status-in-progress">
                    <p>در حال انجام</p>
                  </div>
                ) : (
                  <div className="question-status-solved">
                    <p>حل شده</p>
                  </div>
                )}
                <h1>{currentQuestion?.title}</h1>
              </div>
              {currentUser?.id === currentQuestion?.inquirer?.id &&
                (currentQuestion?.answers?.length === 0 ? (
                  <motion.button
                    className="delete-btn"
                    onClick={() => {
                      deleteQuestion();
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
                    حذف کردن سوال
                  </motion.button>
                ) : (
                  <motion.button
                    className="delete-btn"
                    style={{ backgroundColor: "#808080" }}
                    onClick={() => {
                      window.alert("یک نفر پاسخ داده است نمیتوانید حذف کنید");
                    }}
                    whileTap={{ scale: 0.95 }}
                    tool
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
                    حذف کردن سوال
                  </motion.button>
                ))}
            </div>
            <div className="question-details-container-2">
              <div className="question-votes">
                <img
                  src={upVoteIcon}
                  alt="upvote"
                  onClick={upVoteQuestion}
                  style={{ width: "25px", height: "25px", cursor: "pointer" }}
                />
                <p style={{ margin: ".25em 0", color: "#808080" }}>
                  {toFarsiNumber(upVotes - downVotes)}
                </p>
                <img
                  src={downVoteIcon}
                  alt="upvote"
                  onClick={downVoteQuestion}
                  style={{ width: "25px", height: "25px", cursor: "pointer" }}
                />
              </div>
              <div style={{ width: "100%" }}>
                <p className="question-body">{currentQuestion?.body}</p>
                <div className="question-details-tags">
                  {currentQuestion?.tags?.map((tag) => (
                    <Link
                      key={tag.id}
                      to={`/questionsoftag/${tag.name}`}
                      className="ans-tags"
                    >
                      {" " + tag.name + " "}
                    </Link>
                  ))}
                </div>

                <div className="question-actions-user">
                  <div
                    style={{
                      paddingLeft: "20px",
                      display: "flex",
                      alignItems: "flex-end",
                      flexDirection: "column",
                    }}
                  >
                    <p style={{ color: "gray", fontSize: ".875em" }}>
                      پرسیده شده {fromNow(moment(currentQuestion?.timestamp))}
                    </p>
                    <Link
                      to={`/user/${currentQuestion?.inquirer?.id}`}
                      className="user-link"
                      style={{ color: "#0086d8" }}
                    >
                      {currentQuestion?.inquirer?.name}
                      <motion.div whileTap={{ scale: 0.9 }}>
                        {currentQuestion?.userPosted}
                      </motion.div>
                      <img
                        className="avatar-image"
                        src={allAvatars[currentQuestion?.inquirer.avatar]}
                        height="35px"
                        alt=""
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {currentQuestion?.answers.length !== 0 && (
            <section>
              <h3>
                {toFarsiNumber(parseInt(currentQuestion?.answers.length))} پاسخ
              </h3>
              <DisplayAnswers
                question={currentQuestion}
                setQuestion={setCurrentQuestion}
              />
            </section>
          )}
          <section className="post-ans-container">
            <form
              onSubmit={(e) => {
                handlePostAnswer(e, currentQuestion?.answer?.length);
              }}
            >
              {!(currentQuestion?.inquirer.id === currentUser?.id) && (
                <div style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.112)" }}>
                  <div className="input-group">
                    <label htmlFor="comment-title" className="label">
                      <h4 style={{ fontSize: "1.5em", color: "black" }}>
                        پاسخ شما
                      </h4>
                    </label>
                    <textarea
                      id="answer-body"
                      cols="30"
                      rows="10"
                      value={answer}
                      placeholder="پاسخ خود را بنویسید..."
                      onChange={(e) => setAnswer(e.target.value)}
                    ></textarea>
                    <div></div>
                  </div>
                  <br />
                  <div className="hover-div">
                    <motion.input
                      type="submit"
                      value="ثبت پاسخ"
                      className="post-ans-btn"
                      whileTap={{ scale: 0.9 }}
                    />
                  </div>
                </div>
              )}
            </form>
          </section>
          <section className="post-ans-container">
            <p style={{ fontSize: ".95em" }}>
              سوالی که می‌خواستید را پیدا نکردید؟ در تگ های زیر دنبال آن بگردید
              یا{" "}
              <Link
                to="/AskQuestions"
                style={{ textDecoration: "none", color: "#009dff" }}
              >
                {" "}
                سوال خودتان را بپرسید
              </Link>
            </p>
            <p
              style={{
                fontSize: ".95em",
                direction: "ltr",
                display: "inline",
              }}
            >
              {currentQuestion?.tags?.map((tag) => (
                <Link
                  key={tag.id}
                  to={`/questionsoftag/${tag.name}`}
                  className="ans-tags"
                >
                  {" " + tag.name + " "}
                </Link>
              ))}
            </p>
          </section>
        </div>
      )}
    </div>
  );
};

export default QuestionDetails;
