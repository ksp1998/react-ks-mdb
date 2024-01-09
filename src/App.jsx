import { Outlet } from "react-router-dom";
import { Header } from "./components";
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <main className="lg:ml-24">
        <Outlet />
      </main>
    </Provider>
  );
};

export default App;
