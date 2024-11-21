import { useState, useEffect } from "react";
import "./App.css";
import LeftPanel from "./LeftPanel";
import LoggedPage from "./LoggedPage";
import SignupPage from "./SignupPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [activeUser, setActiveUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  function updateActiveUser(updatedActiveUser) {
    setActiveUser(updatedActiveUser);
  }
  return (
    <Router>
      <Routes>
        {/* Define the routes for LeftPanel (Page 1) and LoggedPage (Page 2) */}
        <Route
          path="/LeftPanel"
          element={
            <LeftPanel
              activeUser={activeUser}
              updateActiveUser={updateActiveUser}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route
          path="/SignupPage"
          element={
            <SignupPage
              activeUser={activeUser}
              updateActiveUser={updateActiveUser}
            />
          }
        />
        <Route
          path="/LoggedPage"
          element={
            <LoggedPage
              activeUser={activeUser}
              updateActiveUser={updateActiveUser}
            />
          }
        />

        {/* Default route - Redirect to LeftPanel (Page 1) */}
        <Route
          path="/"
          element={
            <LeftPanel
              activeUser={activeUser}
              updateActiveUser={updateActiveUser}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
