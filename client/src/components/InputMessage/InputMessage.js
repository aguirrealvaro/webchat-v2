import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./inputmessage.scss";
import { postMessageRequest } from "../../redux/chat/actions";
import { Spinner } from "../Spinner";

export const InputMessage = props => {
  const { idOrigin, idDestiny, sendingMsg } = props;

  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const dataMessage = {
      destiny: idDestiny,
      content: message
    };

    dispatch(postMessageRequest(dataMessage, idOrigin));
    setMessage("");
  };

  return (
    <div className="input-message-container">
      <form
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        <textarea
          type="text"
          placeholder="Send a message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={e => {
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
