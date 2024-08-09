import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/User";
import { LoggedInContext } from "../contexts/LoggedUser";
import { getTopics } from "../../api";
import { FaChevronDown } from "react-icons/fa";
import ErrorComponent from "./ErrorComponent";

const Header = () => {
  const { loggedInUser, isLoggedIn, setLoggedInUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [checkLoggedIn,setCheckLoggedIn] = useState(false)

  const navigate = useNavigate();
  function handleClick(e) {
    e.preventDefault();
    setCheckLoggedIn(true)
    navigate("/logout");
    setLoggedInUser({})
  }
  const [topicsList, setTopicsList] = useState([]);

  useEffect(() => {
    getTopics()
      .then((data) => {
        setTopicsList(data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  if (error) {
    return <ErrorComponent message={error.message} />;
  }

  return (
    <>
      <nav className="nav-section">
        <Link to="/">Home</Link>
        <section className="topic-btn">
          <Link to="/topics">
            All Topics{" "}
            <span id="toggle-icon">
              <FaChevronDown />
            </span>
          </Link>
          <section className="topic-content">
            {topicsList.map((topic) => {
              return (
                <li key={topic.slug}>
                  <Link to={`/articles?topic=${topic.slug}`}>
                    <p>{topic.slug.toUpperCase()}</p>
                  </Link>
                </li>
              );
            })}
          </section>
        </section>

        {isLoggedIn ? (
          <Link to="/logout" onClick={handleClick}>
            Logout
          </Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
      <h1>
        {" "}
        Welcome to NC News !!! {isLoggedIn ? loggedInUser.username : null}    {isLoggedIn? <img className="avatar-img" src={loggedInUser.avatar_url}/> : null}
      </h1>
    </>
  );
};

export default Header;
