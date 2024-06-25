import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// hooks
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  console.log(auth, auth?.userRoles);

  // Cerrar sesion
  const logout = async () => {
    setAuth({});
    navigate("/login");
  };

  // Verificar si el usuario tiene el rol requerido para acceder a la ruta
  const userHasRequiredRole = (routeRoles) => {
    return routeRoles.some((role) => auth.userRoles?.includes(role));
  };

  return (
    <header>
      <h1>Prueba</h1>
      <nav>
        {/* rutas publicas */}
        {!auth?.user && (
          <>
            <Link to="/login">Iniciar sesion</Link>
            <Link to="/register">Registrarse</Link>
          </>
        )}
        {/* rutas privadas */}
        {auth?.user && userHasRequiredRole(["admin", "user"]) && (
          <Link to="/">Principal</Link>
        )}
        {auth?.user && userHasRequiredRole(["admin"]) && (
          <Link to="/admin">Admin</Link>
        )}
        {auth?.user && (
          <button type="button" onClick={logout}>
            Cerrar sesion
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
