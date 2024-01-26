import React, { useState, useEffect } from "react";
import {
  useParams,
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
// import moment from "moment";
import moment from "moment-jalaali";
import copy from "copy-to-clipboard";
// import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";

import upVoteIcon from "../assets/circle-up-solid.svg";

import "./Questions.css";
import DisplayAnswers from "./DisplayAnswers";
import { fromNow } from "../utils";
import axios from "axios";
import { allAvatars } from "../Avatars/Avatars";
import Loading from "../components/Loading/Loading";

const QuestionDetails = (props) => {
  const [answer, setAnswer] = useState(""); //will store the answer

  // const user = null; //will get the user details from the redux store
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, [localStorage.getItem("currentUser")]);

  const navigate = useNavigate();
  const location = useLocation();
  const [upVotes, setUpVotes] = useState(0);
  const [downvotes, setDownVotes] = useState(0);

  const [success, setSuccess] = useState(false);
  const [successText, setSuccessText] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState();

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

  useEffect(() => {
    getSingleQuestion();
  }, []);

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

  useEffect(() => {
    getSingleQuestion();
  }, []);

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

  // const allUsers = [];

  //to extract the entire user details of the user who asked the question
  // const questionUser = [];
  // questionList.data &&
  //   questionList.data.forEach((question) => {
  //     const users = allUsers.filter((user) => user._id === question.userId);
  //     if (users.length > 0) {
  //       questionUser.push(users[0]); // assuming there's only one matching user
  //     }
  //   });

  //contains the avatars depending on user's gender
  // const avatarQuestion =
  //   questionUser[0]?.gender === "Male" ? maleAvatars : femaleAvatars;

  //to post the answer and send the data to the databse and redux store
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
  const URL = "https://sukrit-stackoverflow-clone.netlify.app";
  //to copy the url for share functionality
  const handleShare = () => {
    copy(URL + location.pathname); // will concat home url with the path and copy it to clipboard
    setTimeout(() => {
      setSuccess(false);
    }, 2500);
    setSuccess(true);
    setSuccessText("Link copied successfully.");
  };

  const handleDelete = () => {
    deleteQuestion();
  };

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
                      handleDelete();
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/jmkrnisz.json"
                      trigger="hover"
                      colors="primary:#fff"
                      style={{
                        width: "20px",
                        height: "20px",
                        paddingLeft: "10px",
                      }}
                    ></lord-icon>
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
                    <lord-icon
                      src="https://cdn.lordicon.com/jmkrnisz.json"
                      trigger="hover"
                      colors="primary:#fff"
                      style={{
                        width: "20px",
                        height: "20px",
                        paddingLeft: "10px",
                      }}
                    ></lord-icon>
                    حذف کردن سوال
                  </motion.button>
                ))}
            </div>
            <div className="question-details-container-2">
              <div className="question-votes">
                <lord-icon
                  src="https://cdn.lordicon.com/xdakhdsq.json"
                  trigger="click"
                  colors="primary:#808080"
                  onClick={upVoteQuestion}
                  state="hover-1"
                  style={{ width: "25px", height: "25px" }}
                ></lord-icon>
                <img
                  src={upVoteIcon}
                  alt="upvote"
                  onClick={upVoteQuestion}
                  style={{ width: "25px", height: "25px", cursor: "pointer" }}
                />
                <p style={{ margin: ".25em 0", color: "#808080" }}>
                  {upVotes - downvotes}
                </p>
                <lord-icon
                  src="https://cdn.lordicon.com/albqovim.json"
                  trigger="click"
                  onClick={downVoteQuestion}
                  colors="primary:#808080"
                  state="hover-1"
                  style={{ width: "25px", height: "25px" }}
                ></lord-icon>
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
              <h3>{currentQuestion?.answers.length} پاسخ</h3>
              <DisplayAnswers
                // key={currentQuestion.id}
                question={currentQuestion}
                setQuestion={setCurrentQuestion}
                // handleShare={handleShare}
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
