import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { host } from "../utils";
function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      const respuesta = await fetch(`${host}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const json = await respuesta.json();
      if (respuesta.ok) {
        localStorage.setItem("token", json.token);
        navigate("/");
      } else {
        
        alert(json.message);
      }
      
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-groupa">
          <label htmlFor="username">Usuario</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-groupa">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      {}
      <div className="other-buttons">
        <button style={{ marginTop: "20px" }} onClick={() => navigate("/")}>
          Iniciar sin logearse
        </button>

        <button style={{ marginTop: "20px" }} onClick={() => navigate("/registrarse")}>
          registrarse
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
