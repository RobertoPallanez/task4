import React from "react";
import Header from "./Header";
import "./App.css";
import propTypes from "prop-types";
import Loginbody from "./Loginbody";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function LeftPanel(props) {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  // Use useNavigate to navigate to another page
  const navigate = useNavigate();
  // Function to handle navigation
  const handleNavigate = async () => {
    // Navigate to '/LoggedPage'

    try {
      const response = await axios.post("http://localhost:5000/signIn", {
        email: inputEmail,
        password: inputPassword,
      });

      console.log(`response value in line 27: ${response.data.user.email}`);
      console.log(`token value in line 28: ${response.data.token}`);
      console.log(`value of remember me: ${rememberMe}`);
      // if (response.data.token) {
      //   if (rememberMe) {
      //     localStorage.setItem("authToken", response.data.token);
      //   }

      //   props.setIsLoggedIn(true);
      props.updateActiveUser(response.data.user);

      //   if (response.data.message === "Login successful.") {
      //   navigate("/LoggedPage");
      //   } else {
      //   setError(response.data.message);
      //   console.log("error line 39");
      //   }
      // }

      if (response.data.message === "Login successful.") {
        navigate("/LoggedPage");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : "Server error");
      console.log("error line 52");
    }
  };

  const goToSignupPage = () => {
    navigate("/SignupPage");
  };

  function handleEmailInput(event) {
    const email = event.target.value;
    setInputEmail(email);
  }

  function handlePasswordInput(event) {
    const password = event.target.value;
    setInputPassword(password);
  }

  return (
    <div className="leftPanel">
      <Header />
      <div className="bodyFormFlexbox">
        {/* Pass handleNavigate function as a prop to Loginbody */}
        <Loginbody
          handleNavigate={handleNavigate}
          goToSignupPage={goToSignupPage}
          handleEmailInput={handleEmailInput}
          handlePasswordInput={handlePasswordInput}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          setIsLoggedIn={props.setIsLoggedIn}
        />
        {error && (
          <h3
            style={{ color: "darkred", textAlign: "center", fontSize: "14px" }}
          >
            {error}
          </h3>
        )}
      </div>
    </div>
  );
}

LeftPanel.propTypes = {
  updateActiveUser: propTypes.func.isRequired,
};

LeftPanel.propTypes = {
  setIsLoggedIn: propTypes.func.isRequired,
};

export default LeftPanel;
