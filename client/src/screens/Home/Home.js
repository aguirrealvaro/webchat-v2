import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Profile,
  Contacts,
  Destiny,
  Chat,
  InputMessage,
} from "../../components";
import { logOutUser } from "../../redux/auth/actions";
import { getUsersRequest, setUserDestiny, getChatRequest, postMessageRequest } from "../../redux/chat/actions";
import "./home.scss";

export const Home = () => {
  const auth = useSelector((state) => state.auth);
  const chat = useSelector((state) => state.chat);

  const { destiny } = chat;

  const dispatch = useDispatch();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);
  }, []);

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(
    () => {
      if (windowWidth > 420) {
        const rightSide = document.querySelector(".right-side");
        rightSide.classList.remove("show-destiny");
      }
    },
    [windowWidth]
  );

  return (
    <div className="container">
      <div className="left-side">
        <Profile
          dispatch={dispatch}
          username={auth.user.username}
          logOutUser={logOutUser}
        />
        <Contacts
          dispatch={dispatch}
          idUserLogged={auth.user.id}
          contacts={chat.contacts}
          windowWidth={windowWidth}
          getUsersRequest={getUsersRequest}
          setUserDestiny={setUserDestiny}
        />
      </div>
      <div className="right-side">
        {!destiny ? (
          <div className="select-user-container">
            <span>Select a user to chat</span>
          </div>
        ) : (
          <React.Fragment>
            <Destiny destiny={destiny} />
            <Chat
              dispatch={dispatch}
              idUserLogged={auth.user.id}
              idDestiny={chat.destiny.id}
              messages={chat.messages}
              getChatRequest={getChatRequest}
            />
            <InputMessage
              dispatch={dispatch}
              idOrigin={auth.user.id}
              idDestiny={chat.destiny.id}
              sendingMsg={chat.sendingMsg}
              postMessageRequest={postMessageRequest}
            />
          </React.Fragment>
        )}
      </div>
    </div>
  );
};
