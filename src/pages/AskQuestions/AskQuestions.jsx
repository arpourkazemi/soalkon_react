import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import "./AskQuestions.css";
import axios from "axios";
import QuestionList from "../../components/HomeMainBar/QuestionList";

const AskQuestions = () => {
  //useState hook to store the title, body and tags
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [tags, setTags] = useState("");
  const [price, setPrice] = useState("");

  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [similarQuestionsJson, setSimilarQuestionsJson] = useState({});
  const [similarQuestions, setSimilarQuestions] = useState([]);
  const [showSimilarQuestions, setShowSimilarQuestions] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, [localStorage.getItem("currentUser")]);

  useEffect(() => {
    Object.keys(similarQuestionsJson).length !== 0 && getSimilarQuestions();
  }, [similarQuestionsJson]);

  useEffect(() => {
    if (!showSimilarQuestions) {
      setSimilarQuestionsJson({});
      setSimilarQuestions([]);
    }
  }, [showSimilarQuestions]);

  const postQuestion = async () => {
    setLoading(true);
    await axios
      .post("api/question", {
        title: questionTitle,
        body: questionBody,
        tags: tags.split(" "),
        price: price,
        inquirer_id: currentUser.id,
        question_status: "NOT_SOLVED",
      })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
    setLoading(false);
  };

  const getSimilarQuestions = async () => {
    setLoading(true);
    for (const [key, value] of Object.entries(similarQuestionsJson)) {
      await axios
        .get(`/api/question/${key}/details`)
        .then((res) => {
          setSimilarQuestions((perv) => [
            ...perv,
            { ...res.data, similarity_percentage: parseInt(value) },
          ]);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    setShowSimilarQuestions(true);
    setLoading(false);
  };

  const checkSimilarity = async () => {
    setLoading(true);
    setSimilarQuestionsJson({
      6: "10.0",
      8: "30.0",
      9: "50.0",
      11: "70.0",
      12: "90.0",
    });
    // await axios
    //   .get(`/api/questionsimilarity/${questionBody}`)
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
    setLoading(false);
  };

  //to handle the data after submitting a question
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (questionTitle === "" || questionBody === "" || tags === "") {
      alert("لطفا اطلاعات مورد نیاز سوال را تکمیل فرمائید.");
      return;
    }
    // postQuestion();
    checkSimilarity();

    // dispatch(
    //   askQuestion(
    //     {
    //       questionTitle,
    //       questionBody,
    //       tags,
    //       userPosted: user.result.name, // in 'user' we got a token 'result' which contains the name of the user logged in
    //       userId: user?.result?._id,
    //     },
    //     navigate
    //   )
    // );
  };

  //to handle the event of the 'enter' key pressed in the question's body
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setQuestionBody(questionBody + "\n"); // When 'enter' is pressed then add a '\n' to the 'questionBody' as well
    }
  };
  return (
    <div className="ask-question">
      <div className="ask-ques-container main-question-container">
        {showSimilarQuestions ? (
          <div>
            <h1>سوالات مشابه</h1>
            <div className="ask-form-container question-container">
              <QuestionList questionList={similarQuestions} />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignContent: "center",
                justifyContent: "space-around",
              }}
            >
              <motion.input
                type="button"
                value="ویرایش اطلاعات"
                className="review-btn"
                onClick={() => {
                  setShowSimilarQuestions(false);
                }}
                whileTap={{ scale: 0.95 }}
              />
              <motion.input
                type="button"
                onClick={() => {
                  postQuestion();
                }}
                value="قراردادن سوال"
                className="review-btn"
                whileTap={{ scale: 0.95 }}
              />
            </div>
          </div>
        ) : (
          <div>
            <h1>پرسیدن سوال جدید</h1>
            <form onSubmit={handleOnSubmit}>
              <div className="ask-form-container question-container">
                <div style={{ width: "70%" }}>
                  <div className="input-group">
                    <label htmlFor="ask-ques-title" className="label">
                      <h4 style={{ fontSize: "1.25em" }}>عنوان</h4>
                      <p>عنوان سوال را کوتاه و گویا بنویسید</p>
                    </label>
                    <input
                      type="text"
                      className="normal-input"
                      name="question-title"
                      id="ask-ques-tags"
                      value={questionTitle}
                      onChange={(e) => {
                        setQuestionTitle(e.target.value);
                      }}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="ask-ques-body" className="label">
                      <h4 style={{ fontSize: "1.25em" }}>متن سوال</h4>
                      <p>شامل تمام اطلاعاتی که پاسخ دهنده به آن نیاز دارد</p>
                    </label>
                    <textarea
                      name="ask-ques-body"
                      id="ask-ques-body"
                      className="normal-text-area"
                      cols="30"
                      rows="10"
                      value={questionBody}
                      onChange={(e) => {
                        setQuestionBody(e.target.value);
                      }}
                      onKeyDown={handleEnter}
                    ></textarea>
                  </div>
                  <div className="input-group">
                    <label htmlFor="ask-ques-tags" className="label">
                      <h4 style={{ fontSize: "1.25em" }}>تگ ها</h4>
                      <p>
                        کلیدواژه های مربوط به سوال خود را بصورت کلمات جدا از هم
                        وارد کنید
                      </p>
                    </label>
                    <input
                      type="text"
                      cols="30"
                      name="question-tags"
                      className="normal-input"
                      id="ask-ques-tags"
                      value={tags}
                      onChange={(e) => {
                        setTags(e.target.value);
                      }}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="ask-ques-tags" className="label">
                      <h4 style={{ fontSize: "1.25em" }}>قیمت</h4>
                      <p>
                        مبلغی که قصد دارید به پاسخ دهنده پرداخت کنید، بصورت عددی
                        وارد کنید. توجه کنید بلافاصله پس از قرار گرفتن سوال این
                        مبلغ از اعتبار شما کسر می‌گردد
                      </p>
                    </label>
                    <input
                      type="number"
                      cols="30"
                      name="question-tags"
                      className="normal-input"
                      id="ask-ques-tags"
                      value={price}
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <motion.input
                    type="submit"
                    value="بررسی سوال"
                    className="review-btn"
                    whileTap={{ scale: 0.95 }}
                  />
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AskQuestions;
