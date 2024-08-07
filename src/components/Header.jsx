import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/User";
import { LoggedInContext } from "../contexts/LoggedUser";

const Header = () => {
  const { loggedInUser } = useContext(UserContext);
  const { loggedIn, setLoggedIn } = useContext(LoggedInContext);
  const navigate = useNavigate();
  function handleClick(e) {
    e.preventDefault();
    setLoggedIn(false);
    navigate("/logout");
  }
  return (
    <>
      <nav className="nav-section">
        <Link to="/">Home</Link>
        <Link to="/topics">Topics</Link>
        {loggedIn ? (
          <Link to="/logout" onClick={handleClick}>
            Logout
          </Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
      <h1> Welcome to NC News !!! {loggedIn ? loggedInUser : null}</h1>
    </>
  );
};

export default Header;
