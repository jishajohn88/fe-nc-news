import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/User";
import { LoggedInContext } from "../contexts/LoggedUser";
import { getTopics } from "../../api";
import { FaChevronDown } from "react-icons/fa";

const Header = () => {
  const { loggedInUser } = useContext(UserContext);
  const { loggedIn, setLoggedIn } = useContext(LoggedInContext);
  const navigate = useNavigate();
  function handleClick(e) {
    e.preventDefault();
    setLoggedIn(false);
    navigate("/logout");
  }
  const [topicsList, setTopicsList] = useState([]);

  useEffect(() => {
    getTopics().then((data) => {
      setTopicsList(data);
    });
  }, []);

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
