import React from "react";

import "../../App.css";
import HomeMainBar from "../../components/HomeMainBar/HomeMainBar";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";

const Home = () => {
  return (
    <div className="home-container-1">
      <LeftSideBar />
      <div className="home-container-2">
        <HomeMainBar />
      </div>
    </div>
  );
};

export default Home;
