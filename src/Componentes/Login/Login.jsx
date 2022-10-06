import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = ({ setPokebolaAppears, pokebolaAppears }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onUserInput = (e) => {
    setUser(e.target.value);
  };

  const onPasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const setJwt = async () => {
    try {
      setPokebolaAppears(true);
      const respuesta = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user,
          password: password,
        }),
      });
      setTimeout(() => {
        setPokebolaAppears(false);
        console.log("Esto se esta ejecutando");
      }, 1500);
      if (!respuesta.ok) {
        const error = await respuesta.json();
        setErrorMessage(error.message);
        throw new Error(error.message);
      }

      const auth = await respuesta.json();
      console.log(auth);

      localStorage.setItem("token", auth.token);

      navigate("/main");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setJwt();
  };

  return (
    <>
      <div className="container">
        <div className="logo">
          <h2>Pokédex</h2>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Username"
            className="input-user"
            onChange={onUserInput}
            value={user}
          />
          <input
            type="password"
            placeholder="Password"
            className="input-password"
            onChange={onPasswordInput}
            value={password}
          />
          <button className="button">Log in</button>
        </form>
        {errorMessage ? (
          <div className="message">
            <p>{errorMessage}</p>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Login;
