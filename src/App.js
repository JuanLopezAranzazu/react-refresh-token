import { Routes, Route } from "react-router-dom";
// components
import Layout from "./components/Layout";
import Login from "./components/Login";
import Register from "./components/Register";
import RequireAuth from "./components/RequireAuth";
// pages
import Home from "./pages/Home";
import Missing from "./pages/Missing";
import Protected from "./pages/Protected";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* rutas publicas */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="" element={<Home />} />
        {/* rutas privadas */}
        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path="admin" element={<Protected />} />
        </Route>
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
