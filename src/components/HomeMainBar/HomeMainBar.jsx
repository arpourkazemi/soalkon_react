import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import "./HomeSideBar.css";
import QuestionList from "./QuestionList";
import axios from "axios";

const HomeMainBar = () => {
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, [localStorage.getItem("currentUser")]);

  const tagName = useParams();

  const [loading, setLoading] = useState(false);
  const [questionList, setQuestionList] = useState([]);

  const getQuestions = async () => {
    setLoading(true);
    await axios
      .get("api/question/details/")
      .then((res) => {
        let data = res.data;
        if (location.pathname === "/") {
          data = res.data.sort((q1, q2) =>
            q1.upvote - q1.downvote < q2.upvote - q2.downvote
              ? 1
              : q1.upvote - q1.downvote > q2.upvote - q2.downvote
              ? -1
              : 0
          );
        } else {
          data = res.data.sort((q1, q2) =>
            q1.timestamp < q2.timestamp
              ? 1
              : q1.timestamp > q2.timestamp
              ? -1
              : 0
          );
        }
        setQuestionList(data);
      })
      .catch((err) => {
        console.error(err);
      });
    setLoading(false);
  };

  const getQuestionsOfTagName = async () => {
    setLoading(true);
    await axios
      .get(`api/tag/details/${tagName.tagname}`)
      .then((res) => {
        setQuestionList(res.data[0].questions);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    setLoading(false);
  };

  useEffect(() => {
    tagName?.tagname ? getQuestionsOfTagName() : getQuestions();
  }, [tagName]);

  useEffect(() => {
    location.pathname === "/" &&
      setQuestionList(
        questionList.sort((q1, q2) =>
          q1.upvote - q1.downvote < q2.upvote - q2.downvote
            ? 1
            : q1.upvote - q1.downvote > q2.upvote - q2.downvote
            ? -1
            : 0
        )
      );
  }, [location]);

  questionList.data &&
    questionList.data.sort((a, b) => {
      if (a.noOfAnswers !== b.noOfAnswers) {
        return b.noOfAnswers - a.noOfAnswers;
      }
      return 0;
    });

  const navigate = useNavigate();

  const checkAuth = () => {
    if (currentUser === null) {
      alert("برای پرسیدن سوال باید وارد شوید.");
      navigate("/auth");
      return;
    }
    navigate("/AskQuestions");
  };

  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>سوالات برتر</h1>
        ) : location.pathname === "/questions" ? (
          <h1>همه سوالات</h1>
        ) : (
          <h1>{`سوالات با تگ ${tagName.tagname}`}</h1>
        )}
        <motion.button
          className="ask-btn"
          onClick={checkAuth}
          style={{ marginLeft: "1.5rem" }}
          whileTap={{ scale: 0.95 }}
        >
          پرسیدن سوال
        </motion.button>
      </div>
      <div>
        {questionList.data === null ? (
          <div className="lds-ring">
            <svg viewBox="25 25 50 50" className="loader-svg">
              <circle r="20" cy="50" cx="50" className="loader-circle"></circle>
            </svg>
          </div>
        ) : (
          <>
            {/* <p>{searchedQuestions.length} سوال</p> */}
            <QuestionList questionList={questionList} />
          </>
        )}
      </div>
    </div>
  );
};

export default HomeMainBar;
