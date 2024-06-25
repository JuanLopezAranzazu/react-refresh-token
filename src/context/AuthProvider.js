import { createContext, useState, useEffect } from "react";
// Crear contexto
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  // Estado para almacenar la información de autenticación
  const [auth, setAuth] = useState(() => {
    const savedAuth = sessionStorage.getItem("auth");
    return savedAuth ? JSON.parse(savedAuth) : {};
  });

  // Actualizar sessionStorage cuando auth cambie
  useEffect(() => {
    sessionStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
