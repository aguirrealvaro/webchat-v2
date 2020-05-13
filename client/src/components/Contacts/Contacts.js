import React, { useEffect, useState } from "react";
import { calculateDate } from "../../utils";
import { socket } from "../../services/socketio";
import "./contacts.scss";

export const Contacts = ({
  id: idUserLogged,
  contacts,
  dispatch,
  getUsersRequest,
  setUserDestiny,
}) => {
  const [inputSearch, setInputSearch] = useState("");
  const [userSelected, setUserSelected] = useState("");

  useEffect(() => {
    dispatch(getUsersRequest());
  }, []);

  useEffect(() => {
    socket.on("getUsers", () => {
      dispatch(getUsersRequest());
    });
  }, []);

  const handleUserDestiny = (userDestiny) => {
    dispatch(setUserDestiny(userDestiny));

    const rightSide = document.querySelector(".right-side");
    rightSide.classList.add("show-destiny");

    setUserSelected(userDestiny.id);
  };

  let results;
  if (inputSearch === "") {
    results = contacts;
  } else {
    results = contacts.filter((user) => {
      return (
        user.infoDestiny.username
          .toLowerCase()
          .indexOf(inputSearch.toLowerCase()) !== -1
      );
    });
  }

  return (
    <div className="contacts-container">
      <div className="searcher-container">
        <input
          className="input-searcher"
          placeholder="Search..."
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
        />
      </div>
      <div className="contacts-list">
        {results.map((user) => {
          const {
            id,
            unseencount,
            infoDestiny: { id: destinyId, username },
            infoLastMessage,
          } = user;

          const userDestiny = {
            id: destinyId,
            username,
          };

          return (
            <div
              className="each-user"
              key={id}
              onClick={() => {
                handleUserDestiny(userDestiny);
              }}
              style={{
                fontWeight: unseencount === 0 ? undefined : "bold",
                backgroundColor:
                  userSelected === destinyId ? "#ebebeb" : undefined,
              }}
            >
              <div className="top-box">
                <div className="username-box">
                  <span>{username}</span>
                </div>
                <div className="time-box">
                  {infoLastMessage && (
                    <span>{calculateDate(infoLastMessage.created_at)}</span>
                  )}
                </div>
              </div>
              <div className="bottom-box">
                <div className="lastmessage-box">
                  {infoLastMessage && (
                    <span>
                      {infoLastMessage.origin === idUserLogged
                        ? "Sent: "
                        : "Recieved: "}
                      {infoLastMessage.content}
                    </span>
                  )}
                </div>
                {unseencount !== 0 && (
                  <div className="unseencount-box">
                    <span>{unseencount}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
