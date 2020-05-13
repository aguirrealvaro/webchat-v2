import React from "react";
import "./destiny.scss";

export const Destiny = ({ destiny: { username } }) => {
  const handleBack = () => {
    const rightSide = document.querySelector(".right-side");
    rightSide.classList.remove("show-destiny");
  };

  return (
    <div className="destiny-container">
      <div className="arrow-back">
        <span onClick={handleBack}>&larr;</span>
      </div>
      <div className="username-box">
        <span>{username}</span>
      </div>
    </div>
  );
};
