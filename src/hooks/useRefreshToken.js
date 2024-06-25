// hooks
import useAuth from "./useAuth";
// api
import axios from "../api/axios";
const TOKEN_URL = "/auth/token";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  // Refrescar token
  const refresh = async () => {
    const response = await axios.post(
      TOKEN_URL,
      JSON.stringify({ refreshToken: auth?.refreshToken }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    // Actualizar token de acceso
    setAuth((prev) => {
      console.log(prev);
      console.log(response?.data?.accessToken);
      return { ...prev, accessToken: response?.data?.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
