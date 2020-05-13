import React, { useState } from "react";
import { Spinner } from "../";
import "./inputmessage.scss";

export const InputMessage = ({
  idOrigin,
  idDestiny,
  sendingMsg,
  dispatch,
  postMessageRequest,
}) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataMessage = {
      destiny: idDestiny,
      content: message,
    };

    dispatch(postMessageRequest(dataMessage, idOrigin));
    setMessage("");
  };

  return (
    <div className="input-message-container">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <textarea
          type="text"
          placeholder="Send a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              e.preventDefault();
              if (message) handleSubmit(e);
            }
          }}
        />
        <button disabled={!message ? true : false} type="submit">
          {sendingMsg ? <Spinner /> : "Send"}
        </button>
      </form>
    </div>
  );
};
