import { useContext, useState } from "react";
import { getUsers } from "../../api";
import PostComment from "./PostComment";
import Loading from "./Loading";
import { useLocation } from "react-router-dom";
import { UserContext, UserProvider } from "../contexts/User";
import { LoggedInContext } from "../contexts/LoggedUser";
const Login = () => {
  const [userNameInput, setUserNameInput] = useState("");
  const [isShowing, setIsShowing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { loggedIn, setLoggedIn } = useContext(LoggedInContext);
  const location = useLocation();
  const articleId = location.state;
  const { setLoggedInUser } = useContext(UserContext);
  function handleChangeUsername(event) {
    setUserNameInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setLoggedInUser(userNameInput);
    getUsers().then((response) => {
      setIsLoading(false);
      response.map((user) => {
        if (user.username === userNameInput) {
          setLoggedIn(true);
          setIsShowing(true);
        } else {
          setIsError(true);
        }
      });
    });
  }
  if (isShowing) {
    return <PostComment userNameInput={userNameInput} articleId={articleId} />;
  }
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <form className="login-form" onSubmit={handleSubmit}>
          {isError ? <p>Login unsuccessful</p> : null}
          <label htmlFor="user-name">Enter your username: </label>
          <input
            type="text"
            name="user-name"
            id="user-name"
            onChange={handleChangeUsername}
            value={userNameInput}
          ></input>
          <button>Login</button>
        </form>
      </>
    );
  }
};

export default Login;
