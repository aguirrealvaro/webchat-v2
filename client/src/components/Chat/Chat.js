import React, { useEffect } from "react";
import ReactEmoji from "react-emoji";
import ScrollToBottom from "react-scroll-to-bottom";
import { calculateDate } from "../../utils";
import { socket } from "../../services/socketio";
import "./chat.scss";

export const Chat = ({
  idUserLogged,
  idDestiny,
  messages,
  dispatch,
  getChatRequest,
}) => {
  useEffect(() => {
    socket.on("getMessages", (idOrigin) => {
      //idOrigin: the user that sent me a message
      //idDestiny: the user that is marked as destiny in my chat
      //if i get a message from the user that is marked as my destiny, get chat
      if (idOrigin === idDestiny) {
        dispatch(getChatRequest(idOrigin));
      }
    });
  }, []);

  return (
    <ScrollToBottom
      className="scroll-to-bottom"
      followButtonClassName="button-scroll"
    >
      <div className="chat-container">
        {messages.map((msg) => {
          const { id, origin, content, created_at } = msg;
          return (
            <div className="each-msg" key={id}>
              <div
                className={
                  idUserLogged === origin
                    ? "bubble from-origin"
                    : "bubble from-destiny"
                }
              >
                <span className="msg-content">
                  {ReactEmoji.emojify(content)}
                </span>
                <span className="msg-date">({calculateDate(created_at)})</span>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollToBottom>
  );
};
