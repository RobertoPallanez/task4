import React from "react";
import "./App.css";
import propTypes from "prop-types"; // Import prop-types for prop validation
// import pg from "pg";

function SignupBody(props) {
  return (
    <div className="signupForm">
      <p>Start your tech journey</p>
      <h2>Create a new Acount</h2>

      {/* {props.error && <p style={{ color: "red" }}>{props.error}</p>} */}

      <input
        className="inputForLogin"
        placeholder="Enter your name and surname"
        type="text" // Add proper input type for email
        id="name"
        onChange={props.handleNameInput}
      />

      <input
        className="inputForLogin"
        placeholder="Enter your role in the company"
        type="text" // Add proper input type for email
        id="rol"
        onChange={props.handleRoleInput}
      />

      <input
        className="inputForLogin"
        placeholder="Enter a valid E-mail for you new account"
        type="email" // Add proper input type for email
        id="email"
        onChange={props.handleEmailInput}
      />

      <input
        className="inputForLogin"
        placeholder="Enter a password for your new account"
        type="password"
        id="password"
        onChange={props.handlePasswordInput}
      />

      <div className="checkBoxContainer">
        <input type="checkbox" id="checkBox" />
        <label htmlFor="checkBox">Remember me</label>
      </div>

      <button onClick={props.handleNavigate}>Sign Up</button>

      <span className="signUp">
        Already have an account?{" "}
        <span onClick={props.goToSigninPage} className="signUpLink">
          Sign In
        </span>
      </span>
    </div>
  );
}

// Prop validation to ensure handleNavigate is passed as a function
SignupBody.propTypes = {
  handleNavigate: propTypes.func.isRequired,
};

SignupBody.propTypes = {
  goToSignupPage: propTypes.func.isRequired,
};

SignupBody.propTypes = {
  goToSigninPage: propTypes.func.isRequired,
};

SignupBody.propTypes = {
  handleNameInput: propTypes.func.isRequired,
};

SignupBody.propTypes = {
  handleRoleInput: propTypes.func.isRequired,
};

SignupBody.propTypes = {
  handleEmailInput: propTypes.func.isRequired,
};

SignupBody.propTypes = {
  handlePasswordInput: propTypes.func.isRequired,
};

SignupBody.propTypes = {
  error: propTypes.func.isRequired,
};

export default SignupBody;
