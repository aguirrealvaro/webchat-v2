import * as React from "react";
import "./stackinfo.scss";

export const StackInfo = () => {
  return (
    <div className="stackinfo-container">
      <section>
        <h2>WebChat.</h2>
        <p>Real time web app to chat with other users. With authentication.</p>
      </section>
      <section>
        <p>Stack: </p>
        <p>Node, Express, PostgreSQL, Sequelize, JWT Tokens</p>
        <p>React, Redux, SASS, Socket.IO</p>
      </section>
    </div>
  );
};
