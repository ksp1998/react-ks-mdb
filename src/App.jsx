import { Outlet } from "react-router-dom";
import { Header } from "./components";

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default App;
