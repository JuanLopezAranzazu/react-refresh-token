import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// hooks
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const WHOAMI_URL = "/auth/whoami";

const Home = () => {
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosPrivate.get(WHOAMI_URL);
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
      <h1>Home</h1>
      {data && (
        <div>
          <p>{data?.email}</p>
        </div>
      )}
    </section>
  );
};

export default Home;
