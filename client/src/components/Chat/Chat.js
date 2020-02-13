import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./chat.scss";
import { calculateDate } from "../../utils";
import { socket } from "../../services/socketio";
import ReactEmoji from "react-emoji";
import { getChatRequest } from "../../redux/chat/actions";

export const Chat = props => {
  const { idUserLogged, idDestiny, messages } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("getMessages", idOrigin => {
      //idOrigin: the user that sent me a message
      //idDestiny: the user that is marked as destiny in my chat
      //if i get a message from the user that is marked as my destiny, get chat
      if (idOrigin === idDestiny) {
        dispatch(getChatRequest(idOrigin));
      }
    });
  }, []);

  return (
    <div className="chat-container">
      {messages.map(msg => {
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
              <span className="msg-content">{ReactEmoji.emojify(content)}</span>
              <span className="msg-date">({calculateDate(created_at)})</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
