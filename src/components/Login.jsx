import { useContext, useState } from "react";
import { getUsers } from "../../api";
import Loading from "./Loading";
import {useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/User";
const Login = () => {
  const [userNameInput, setUserNameInput] = useState("");
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setLoggedInUser} = useContext(UserContext);
  function handleChangeUsername(event) {
    setUserNameInput(event.target.value);
  }

  function handleClick(event) {
    event.preventDefault();
    setIsLoading(true);
    getUsers()
      .then((response) => {
        setIsLoading(false);
        response.map((user) => {
          if (user.username === userNameInput) {
            setLoggedInUser(user);
            navigate("/");
          } else {
            setIsError(true);
          }
        });
      })
      .catch((err) => {
        setError(err);
      });
  }
  if (error) {
    return <ErrorComponent message={error.message} />;
  }

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <form className="login-form">
          {isError ? <p>Login unsuccessful</p> : null}
          <label htmlFor="user-name">Enter your username: </label>
          <input
            type="text"
            name="user-name"
            id="user-name"
            onChange={handleChangeUsername}
            value={userNameInput}
          ></input>
          <button onClick={handleClick}>Login</button>
        </form>
      </>
    );
  }
};

export default Login;
