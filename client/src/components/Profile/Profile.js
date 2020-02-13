import React, { useState } from "react";
import "./profile.scss";
import { useDispatch } from 'react-redux'
import { logOutUser } from '../../redux/auth/actions'

export const Profile = props => {
  const { username } = props;

  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch()

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
