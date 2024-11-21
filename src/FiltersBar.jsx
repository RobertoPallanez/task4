import React from "react";
import "./App.css";
import propTypes from "prop-types";
import axios from "axios";
import { useState, useEffect } from "react";

function FiltersBar(props) {
  //   const [filteredUsers, setFilteredUsers] = useState("");
  if (props.activeUser.name == undefined) {
    props.handleNavigateBack();
  }

  useEffect(() => {
    console.log("active user in filters: " + props.activeUser.name);
    console.log("active user in filters blocked?: " + props.activeUser.blocked);
  });

  const handleBlock = async () => {
    try {
      const isActiveUserBlocked = await axios.post(
        "http://localhost:5000/checkBlocked",
        {
          name: props.activeUser.name,
          role: props.activeUser.role,
          email: props.activeUser.email,
          blocked: props.activeUser.blocked,
        }
      );
      const blockedStatus = isActiveUserBlocked.data.blocked;
      console.log("frontend: is active user blocked? " + blockedStatus);
      // Send the checked IDs to the backend to update the "blocked" column in the database
      if (blockedStatus == false) {
        const response = await axios.post("http://localhost:5000/block", {
          ids: props.checkedRows,
        });

        // Log the response
        console.log(response.data);
        props.resetCheckedRows();
      } else {
        console.log("Access Denied: User blocked.");
        props.handleNavigateBack();
      }
      // Optionally, you can show a success message or update the UI here
    } catch (error) {
      console.error("Error blocking users:", error);
    }
  };

  const handleUnblock = async () => {
    try {
      const isActiveUserBlocked = await axios.post(
        "http://localhost:5000/checkBlocked",
        {
          name: props.activeUser.name,
          role: props.activeUser.role,
          email: props.activeUser.email,
          blocked: props.activeUser.blocked,
        }
      );
      const blockedStatus = isActiveUserBlocked.data.blocked;
      console.log("frontend: is active user blocked? " + blockedStatus);
      // Send the checked IDs to the backend to update the "blocked" column in the database
      if (blockedStatus == false) {
        const response = await axios.post("http://localhost:5000/unblock", {
          ids: props.checkedRows,
        });

        // Log the response
        console.log(response.data);
        props.resetCheckedRows();
      } else {
        console.log("Access Denied: User blocked.");
        props.handleNavigateBack();
      }
    } catch (error) {
      console.error("Error unblocking users:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const isActiveUserBlocked = await axios.post(
        "http://localhost:5000/checkBlocked",
        {
          name: props.activeUser.name,
          role: props.activeUser.role,
          email: props.activeUser.email,
          blocked: props.activeUser.blocked,
        }
      );
      const blockedStatus = isActiveUserBlocked.data.blocked;
      console.log("frontend: is active user blocked? " + blockedStatus);
      // Send the checked IDs to the backend to update the "blocked" column in the database
      if (blockedStatus == false) {
        const response = await axios.post("http://localhost:5000/delete", {
          ids: props.checkedRows,
        });

        // Log the response
        console.log(response.data);
        props.resetCheckedRows();
        props.fetchAllUsers();
      } else {
        console.log("Access Denied: User blocked.");
        props.handleNavigateBack();
      }
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  };

  return (
    <div className="filtersBar">
      <ul className="buttonsList">
        <li>
          <button className="blockButton" onClick={handleBlock}>
            <svg
              className="lockIcon"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6V4C4 1.79086 5.79086 0 8 0C10.2091 0 12 1.79086 12 4V6H14V16H2V6H4ZM6 4C6 2.89543 6.89543 2 8 2C9.10457 2 10 2.89543 10 4V6H6V4ZM7 13V9H9V13H7Z"
                  fill="#366ef2"
                ></path>{" "}
              </g>
            </svg>
            Block
          </button>
        </li>
        <li>
          <button className="blockButton" onClick={handleUnblock}>
            <svg
              className="unlockIcon"
              viewBox="0 0 16.00 16.00"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#000000"
              strokeWidth="0.00016"
              transform="rotate(0)"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="#CCCCCC"
                strokeWidth="0.096"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.5 2C10.6716 2 10 2.67157 10 3.5V6H13V16H1V6H8V3.5C8 1.567 9.567 0 11.5 0C13.433 0 15 1.567 15 3.5V4H13V3.5C13 2.67157 12.3284 2 11.5 2ZM9 10H5V12H9V10Z"
                  fill="#366ef2"
                ></path>{" "}
              </g>
            </svg>
          </button>
        </li>
        <li>
          <button className="deleteButton" onClick={handleDelete}>
            <svg
              className="deleteIcon"
              fill="#b00303"
              viewBox="0 0 24.00 24.00"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#b00303"
              strokeWidth="0.744"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="#CCCCCC"
                strokeWidth="0.192"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M22,5a1,1,0,0,1-1,1H3A1,1,0,0,1,3,4H8V3A1,1,0,0,1,9,2h6a1,1,0,0,1,1,1V4h5A1,1,0,0,1,22,5ZM4.934,21.071,4,8H20l-.934,13.071a1,1,0,0,1-1,.929H5.931A1,1,0,0,1,4.934,21.071ZM15,18a1,1,0,0,0,2,0V12a1,1,0,0,0-2,0Zm-4,0a1,1,0,0,0,2,0V12a1,1,0,0,0-2,0ZM7,18a1,1,0,0,0,2,0V12a1,1,0,0,0-2,0Z"></path>
              </g>
            </svg>
          </button>
        </li>
      </ul>
      <input
        onChange={props.handleSearchbarChange}
        onKeyDown={props.handleFilterUsers}
        type="text"
        className="searchBar"
        placeholder="Filter"
      />
      <span className="logoutLink">Hello, {props.activeUser.name}</span>
      <span className="logoutLink" onClick={props.handleNavigateBack}>
        Logout
      </span>
    </div>
  );
}

FiltersBar.propTypes = {
  handleNavigateBack: propTypes.func.isRequired,
};

FiltersBar.propTypes = {
  handleRefreshPage: propTypes.func.isRequired,
};

FiltersBar.propTypes = {
  handleFilterUsers: propTypes.func.isRequired,
};

FiltersBar.propTypes = {
  handleSearchbarChange: propTypes.func.isRequired,
};

export default FiltersBar;
