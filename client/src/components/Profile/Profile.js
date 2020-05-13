import React, { useState } from "react";
import "./profile.scss";

export const Profile = ({ username, dispatch, logOutUser }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="profile-container">
      <div className="username-box">
        <h4>{username}</h4>
      </div>
      <div className="options-box">
        <button
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          <i className="fas fa-ellipsis-v" />
          {showMenu && (
            <nav className="profile-menu">
              <ul>
                <li
                  onClick={() => {
                    dispatch(logOutUser());
                  }}
                >
                  Log out
                </li>
              </ul>
            </nav>
          )}
        </button>
      </div>
    </div>
  );
};
