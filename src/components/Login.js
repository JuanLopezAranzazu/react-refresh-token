import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
// hooks
import useAuth from "./../hooks/useAuth";
// api
import axios from "../api/axios";
const LOGIN_URL = "/auth/login";

const Login = () => {
  const { setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response?.data);
      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;

      const decodedToken = jwtDecode(accessToken);
      const userRoles = decodedToken.roles;
      console.log(userRoles);

      setAuth({ user: email, accessToken, refreshToken, userRoles });
      setEmail("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <h1>Inicio de sesion</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Correo</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Iniciar sesion</button>
      </form>
      <Link to="/register">Registrarse</Link>
    </section>
  );
};

export default Login;
