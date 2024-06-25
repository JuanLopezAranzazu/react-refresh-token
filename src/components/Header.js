import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>Prueba</h1>
      <nav>
        <Link to="/">Principal</Link>
        <Link to="/login">Iniciar sesion</Link>
        <Link to="/register">Registrarse</Link>
      </nav>
    </header>
  );
};

export default Header;
