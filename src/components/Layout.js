import { Outlet } from "react-router-dom";
// components
import Header from "./Header";

const Layout = () => {
  return (
    <section>
      <Header />
      <Outlet />
    </section>
  );
};

export default Layout;
