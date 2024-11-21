import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";
import SignupBody from "./SignupBody";
import { useState } from "react";
import axios from "axios";

function SignupPage(props) {
  const [inputName, setInputName] = useState("");
  const [inputRole, setInputRole] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [usersInfo, setUsersInfo] = useState(null);

  const navigate = useNavigate();

  const handleNavigate = async () => {
    console.log(`Input Name: ${inputName}`);
    console.log(`Input Role: ${inputRole}`);
    console.log(`Input Email: ${inputEmail}`);
    console.log(`Input Password: ${inputPassword}`);

    try {
      const response = await axios.post(
        "https://task4-3-uprp.onrender.com/register",
        {
          name: inputName,
          role: inputRole,
          email: inputEmail,
          password: inputPassword,
        }
      );

      setUser(response.data);
      props.updateActiveUser(response.data.user);
      setError("");

      navigate("/LoggedPage");
    } catch (err) {
      setError(err.response ? err.response.data.message : "Server error");
    }
  };

  const goToSigninPage = () => {
    navigate("/LeftPanel");
  };

  function handleNameInput(event) {
    const newName = event.target.value;
    setInputName(newName);
  }

  function handleRoleInput(event) {
    const newRole = event.target.value;
    setInputRole(newRole);
  }

  function handleEmailInput(event) {
    const newEmail = event.target.value;
    setInputEmail(newEmail);
  }

  function handlePasswordInput(event) {
    const newPassword = event.target.value;
    setInputPassword(newPassword);
  }

  return (
    <div className="signinPageBody">
      <Header />
      <div className="signupFlexbox">
        <SignupBody
          handleNavigate={handleNavigate}
          goToSigninPage={goToSigninPage}
          handleNameInput={handleNameInput}
          handleRoleInput={handleRoleInput}
          handleEmailInput={handleEmailInput}
          handlePasswordInput={handlePasswordInput}
          error={error}
          activeUser={props.activeUser}
          updateActiveUser={props.updateActiveUser}
        />
      </div>
    </div>
  );
}

SignupPage.propTypes = {
  updateActiveUser: propTypes.func.isRequired,
};

export default SignupPage;
