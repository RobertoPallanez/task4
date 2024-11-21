import React from "react";
import "./App.css";
import propTypes from "prop-types"; // Import prop-types for prop validation
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

function Loginbody(props) {
  const [showPassword, setShowPassword] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="loginForm">
      <p>Welcome back</p>
      <h2>Sign in to your account</h2>

      {/* E-mail input */}
      <input
        className="inputForLogin"
        placeholder="E-mail"
        type="email" // Add proper input type for email
        id="email"
        onChange={props.handleEmailInput}
      />

      {/* Password input */}
      {/* <div className="passwordInputBox"> */}
      <input
        className="inputForLogin"
        // className={
        //   showPassword ? "passwordForLoginShow" : "passwordForLoginHide"
        // }

        // className={`password-input ${
        //   showPassword ? "show-password" : "hide-password"
        // }`}
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        id="password"
        onChange={props.handlePasswordInput}
        onClick={togglePasswordVisibility}
      />
      {/* </div> */}

      {/* Checkbox */}
      <div className="checkBoxContainer">
        <input
          checked={props.rememberMe}
          onChange={() => props.setRememberMe(!props.rememberMe)}
          type="checkbox"
          id="checkBox"
        />
        <label htmlFor="checkBox">Remember me</label>
      </div>

      {/* Sign In Button */}
      <button onClick={props.handleNavigate}>Sign in</button>

      {/* Sign Up Link */}
      <span className="signUp">
        Don't have an account?{" "}
        <span onClick={props.goToSignupPage} className="signUpLink">
          Sign Up
        </span>
      </span>
    </div>
  );
}

// Prop validation to ensure handleNavigate is passed as a function
Loginbody.propTypes = {
  handleNavigate: propTypes.func.isRequired,
};

Loginbody.propTypes = {
  goToSignupPage: propTypes.func.isRequired,
};

Loginbody.propTypes = {
  handleEmailInput: propTypes.func.isRequired,
};

Loginbody.propTypes = {
  handlePasswordInput: propTypes.func.isRequired,
};

Loginbody.propTypes = {
  setRememberMe: propTypes.func.isRequired,
};

export default Loginbody;
