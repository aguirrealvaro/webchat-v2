import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import "./home.scss";
import { Profile } from "../Profile";
import { Contacts } from "../Contacts";
import { Destiny } from "../Destiny";
import { Chat } from "../Chat";
import { InputMessage } from "../InputMessage";

export const Home = () => {
  const auth = useSelector(state => state.auth)
  const chat = useSelector(state => state.chat)

  const { destiny } = chat

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);
  }, []);

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    if (windowWidth > 420) {
      const rightSide = document.querySelector(".right-side");
      rightSide.classList.remove("show-destiny");
    }
  }, [windowWidth]);

  return (
    <div className="container">
      <div className="left-side">
        <Profile
          username={auth.user.username}
        />
        <Contacts
          idUserLogged={auth.user.id}
          contacts={chat.contacts}
          windowWidth={windowWidth}
        />
      </div>
      <div className="right-side">
        {!destiny ? (
          <div className="select-user-container">
            <span>Select a user to chat</span>
          </div>
        ) : (
          <React.Fragment>
            <Destiny 
              destiny={destiny} 
              windowWidth={windowWidth} 
            />
            <Chat
              idUserLogged={auth.user.id}
              idDestiny={chat.destiny.id}
              messages={chat.messages}
            />
            <InputMessage
              idOrigin={auth.user.id}
              idDestiny={chat.destiny.id}
              sendingMsg={chat.sendingMsg}
            />
          </React.Fragment>
        )}
      </div>
    </div>
  );
};
