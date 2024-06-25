import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <section>
      <h1>Unauthorized</h1>
      <div>
        <button onClick={goBack}>Volver</button>
      </div>
    </section>
  );
};

export default Unauthorized;
