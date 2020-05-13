import React from "react";
import { StackInfo } from "../";
import "./welcome.scss";

export const Welcome = (props) => {
  return (
    <div className="welcome-container">
      <div className="left-column">
        <StackInfo />
      </div>
      <div className="right-column">{props.children}</div>
    </div>
  );
};
