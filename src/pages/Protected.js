import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// hooks
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const USERS_URL = "/user";

const Home = () => {
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosPrivate.get(USERS_URL);
        console.log(response?.data);
        setData(response?.data);
      } catch (error) {
        console.error(error);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getData();
  }, [axiosPrivate, navigate, location]);

  return (
    <section>
      <h1>Pagina protegida</h1>
      {data && (
        <div>
          <ul>
            {data.map((user) => (
              <li key={user._id}>{user.email}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default Home;
