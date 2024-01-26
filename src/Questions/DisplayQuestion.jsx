import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

//component
import LeftSideBar from "../components/LeftSideBar/LeftSideBar";
import QuestionDetails from "./QuestionDetails";

const DisplayQuestion = () => {
  const { id } = useParams();

  return (
    <div className="home-container-1">
      <LeftSideBar />
      <div className="home-container-2">
        <QuestionDetails id={id} />
      </div>
    </div>
  );
};

export default DisplayQuestion;
