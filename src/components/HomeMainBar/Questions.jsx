import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { gsap } from "gsap";

import { fromNow } from "../../utils";
import { allAvatars } from "../../Avatars/Avatars";
import { motion } from "framer-motion";

const Questions = ({ question }) => {
  //gsap
  useEffect(() => {
    gsap.fromTo(
      ".display-question-container",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        stagger: 0.15,
      }
    );
  }, []);

  //screenWidth context

  return (
    <div className="display-question-container" data-scroll-section>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="display-votes-ans">
          <p>{question.upvote - question.downvote}</p>
          <p className="label">رای</p>
        </div>
        <div className="display-votes-ans">
          <p>{question.answers?.length}</p>
          <p className="label">پاسخ</p>
        </div>
      </div>
      <div className="display-question-details">
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {question.question_status === "NOT_SOLVED" ? (
              <div className="question-status-not-solved">
                <p className="status">حل نشده</p>
              </div>
            ) : question.question_status === "IN_PROGRESS" ? (
              <div className="question-status-in-progress">
                <p>در حال انجام</p>
              </div>
            ) : (
              <div className="question-status-solved">
                <p>حل شده</p>
              </div>
            )}
            <Link
              to={`/questions/${question.id}`}
              className="question-title-link"
              target={question.similarity_percentage ? "_blank" : ""}
            >
              {question.title}
            </Link>
          </div>

          <div className="display-tags-time" style={{ marginTop: "5px" }}>
            <div className="display-tags">
              {question?.tags?.map((tag) => (
                <Link
                  to={`/questionsoftag/${tag.name}`}
                  target={question.similarity_percentage ? "_blank" : ""}
                >
                  <p key={tag.id}>{tag.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            flexDirection: "column",
          }}
        >
          {question.similarity ? (
            <p
              className="display-time"
              style={{
                color: `hsl(${
                  (question.similarity / 100) * 120
                }, 100%, 50%)`,
                backgroundColor: "#000",
                padding: "1rem",
                borderRadius: ".5rem",
              }}
            >
              {question.similarity} % تشابه
            </p>
          ) : (
            <div>
              <p className="display-time" style={{ color: "gray" }}>
                پرسیده شده {fromNow(moment(question.timestamp))}
              </p>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Link
                  to={`/user/${question?.inquirer?.id}`}
                  className="user-link"
                  style={{ color: "#0086d8" }}
                >
                  {question?.inquirer?.name}
                  <motion.div whileTap={{ scale: 0.9 }}>
                    {question?.userPosted}
                  </motion.div>
                  <img
                    className="avatar-image"
                    src={allAvatars[question?.inquirer.avatar]}
                    height="35px"
                    alt=""
                  />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questions;
