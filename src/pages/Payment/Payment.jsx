import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import "./UserProfile.css";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import axios from "axios";

const Payment = () => {
  const giftCards = [{ code: "prof_khosravi", price: 1000000 }];
  const [price, setPrice] = useState(100000);
  const [giftCardCode, setGiftCardCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, [localStorage.getItem("currentUser")]);

  const saveUser = async (addedPrice = price) => {
    console.log(addedPrice);
    setLoading(true);
    await axios
      .post(`api/inquirer`, {
        ...currentUser,
        balance: (currentUser.balance += parseInt(addedPrice)),
      })
      .then((res) => {
        alert("پرداخت موفق آمیز");
        setCurrentUser(res.data);
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        setPrice(100000);
        setGiftCardCode("");
      })
      .catch((err) => {
        console.error(err);
      });
    setLoading(false);
  };

  return (
    <div className="home-container-1">
      <LeftSideBar />
      <div className="home-container-2">
        <div style={{ marginTop: "6rem" }}>
          <h1>پرداخت الکترونیکی</h1>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            height: "35rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f0f0f0",
              borderRadius: "1rem",
              padding: "2rem",
              width: "75%",
            }}
          >
            <h4 style={{ alignSelf: "flex-start" }}>
              پرداخت اینترنتی با کارت بانکی
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignSelf: "flex-start",
              }}
            >
              <label
                style={{ paddingLeft: "2rem", width: "10rem" }}
                htmlFor="ask-ques-title"
                className="label"
              >
                <p>مبلغ</p>
              </label>
              <input
                type="number"
                className="normal-input"
                name="question-title"
                id="ask-ques-title"
                style={{
                  padding: ".5rem 1rem",
                  direction: "ltr",
                  width: "25rem",
                }}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                value={price}
              />
              <label
                style={{ paddingRight: "2rem" }}
                htmlFor="ask-ques-title"
                className="label"
              >
                <p>ریال</p>
              </label>
            </div>
            <motion.button
              className="ask-btn"
              style={{ alignSelf: "flex-end" }}
              onClick={() => saveUser()}
              whileTap={{ scale: 0.95 }}
            >
              پرداخت
            </motion.button>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f0f0f0",
              borderRadius: "1rem",
              padding: "2rem",
              width: "75%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <h4 style={{ alignSelf: "flex-start" }}>پرداخت با کارت هدیه</h4>
              {giftCards.map(
                (giftCard) =>
                  giftCardCode === giftCard.code && (
                    <label
                      style={{
                        paddingRight: "2rem",
                        color: "green",
                        alignSelf: "flex-end",
                      }}
                      htmlFor="ask-ques-title"
                      className="label"
                    >
                      <p>این کارت هدیه دارای اعتبار به مبلغ 1000000 ریال است</p>
                    </label>
                  )
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignSelf: "flex-start",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignSelf: "flex-start",
                }}
              >
                <label
                  style={{ paddingLeft: "2rem", width: "10rem" }}
                  htmlFor="ask-ques-title"
                  className="label"
                >
                  <p>بارکد کارت هدیه</p>
                </label>
                <input
                  type="text"
                  className="normal-input"
                  name="question-title"
                  id="ask-ques-title"
                  style={{
                    padding: ".5rem 1rem",
                    direction: "ltr",
                    width: "25rem",
                  }}
                  onChange={(e) => {
                    setGiftCardCode(e.target.value);
                  }}
                  value={giftCardCode}
                />
              </div>
            </div>
            <motion.button
              className="ask-btn"
              style={{ alignSelf: "flex-end" }}
              onClick={() => {
                saveUser(
                  giftCards.find((giftCard) => giftCardCode === giftCard.code)
                    .price
                );
              }}
              whileTap={{ scale: 0.95 }}
            >
              ثبت کارت هدیه
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
