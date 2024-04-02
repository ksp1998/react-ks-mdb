import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home, Movies, Shows, Search, Details, _404 } from "./pages";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import Person from "./pages/Person";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/shows",
        element: <Shows />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/movie/:id",
        element: <Details mediaType="movie" />,
      },
      {
        path: "/tv/:id",
        element: <Details mediaType="tv" />,
      },
      {
        path: "/person/:id",
        element: <Person />,
      },
      {
        path: "/*",
        element: <_404 />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
