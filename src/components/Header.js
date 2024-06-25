import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// hooks
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    setAuth({});
    navigate("/login");
  };

  return (
    <header>
      <h1>Prueba</h1>
      <nav>
        <Link to="/">Principal</Link>
        <Link to="/login">Iniciar sesion</Link>
        <Link to="/register">Registrarse</Link>
        <button type="button" onClick={logout}>
          Cerrar sesion
        </button>
      </nav>
    </header>
  );
};

export default Header;
