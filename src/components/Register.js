import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
// api
import axios from "../api/axios";
const REGISTER_URL = "/auth/register";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ firstName, lastName, email, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response?.data);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <h1>Registro de usuario</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">Nombre</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName">Apellido</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
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
        <button type="submit">Registrarse</button>
      </form>
      <Link to="/login">Iniciar sesion</Link>
    </section>
  );
};

export default Register;
