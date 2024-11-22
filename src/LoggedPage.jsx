import React from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header";
import FiltersBar from "./FiltersBar";
import ListRow from "./ListRow";
import ItemRow from "./ItemRow";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

function LoggedPage(props) {
  const [usersInfo, setUsersInfo] = useState([]);
  const [error, setError] = useState("");
  const [checkedRows, setCheckedRows] = useState([]);
  const [rows, setRows] = useState([]);
  const [activeUser, setActiveUser] = useState("");
  const [filteredUsers, setFilteredUsers] = useState("");

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(
        "https://task4-3-uprp.onrender.com/getUserInfo"
      );
      setUsersInfo(response.data);
      console.log(`first user info: ${usersInfo[1]}`);
    } catch (err) {
      setError("Error fetching users");
      console.error(err);
    }
  };

  const fetchFilteredUsers = async () => {
    try {
      const response = await axios.post(
        "https://task4-3-uprp.onrender.com/filter",
        {
          filteredUsers: filteredUsers,
        }
      );
      setUsersInfo(response.data);
    } catch (err) {
      setError("Error fetching users");
      console.error(err);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    console.log("active user in loggedPage: " + props.activeUser.name);
    console.log(
      "active user in loggedPage blocked?: " + props.activeUser.blocked
    );
  });

  async function handleFilterUsers(event) {
    if (event.key === "Enter") {
      if (filteredUsers) {
        resetCheckedRows();
        fetchFilteredUsers(); //AQUI ME QUEDE, TOMAR FILTEREDUSERS STRING Y MANDARLO AL SERVER PARA FILTRAR Y RESPONDER.
      } else {
        resetCheckedRows();
        fetchAllUsers();
      }
    }
  }

  function handleSearchbarChange(event) {
    const filteredUsers = event.target.value;
    setFilteredUsers(filteredUsers);
  }

  const handleCheckBoxChange = (id) => {
    setCheckedRows((prevCheckedRows) => {
      // If the ID is already in the array, remove it (uncheck)
      const updatedCheckedRows = prevCheckedRows.includes(id)
        ? prevCheckedRows.filter((rowId) => rowId !== id)
        : [...prevCheckedRows, id]; // Add it (check)

      // Log the updated array to console
      console.log(updatedCheckedRows);

      return updatedCheckedRows; // Update the state
    });
  };

  const resetCheckedRows = () => {
    setCheckedRows([]); // Clear the checked rows
  };

  const handleNavigateBack = () => {
    navigate("/LeftPanel");
  };

  const handleRefreshPage = () => {
    navigate("/LoggedPage");
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(
          "https://task4-3-uprp.onrender.com/getUserInfo"
        );
        setUsersInfo(response.data);
      } catch (err) {
        setError("Error fetching users");
        console.error(err);
      }
    };
    fetchAllUsers();
  }, []);

  return (
    <div className="loggedPageBody">
      <Header />
      <FiltersBar
        handleNavigateBack={handleNavigateBack}
        checkedRows={checkedRows}
        resetCheckedRows={resetCheckedRows}
        handleRefreshPage={handleRefreshPage}
        // fetchRows={fetchRows}
        fetchAllUsers={fetchAllUsers}
        fetchFilteredUsers={fetchFilteredUsers}
        activeUser={props.activeUser}
        updateActiveUser={props.updateActiveUser}
        handleFilterUsers={handleFilterUsers}
        handleSearchbarChange={handleSearchbarChange}
      />
      <ListRow />
      {/* <ItemRow /> */}
      {usersInfo.map((user) => (
        <ItemRow
          id={user.id}
          key={user.id}
          name={user.name}
          role={user.role}
          email={user.email}
          lastSeen={formatDistanceToNow(new Date(user.last_seen), {
            addSuffix: true,
          })}
          handleCheckBoxChange={handleCheckBoxChange}
          checkedRows={checkedRows}
        />
      ))}
      ;
    </div>
  );
}

export default LoggedPage;
