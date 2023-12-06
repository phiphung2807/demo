import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const ClientLayout = () => {
  return (
    <>
      <Header></Header>
      <div>
        <Outlet />
      </div>
      <Footer></Footer>
    </>
  );
};

export default ClientLayout;
