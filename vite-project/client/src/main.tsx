import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import RootRoute from "./routes/RootRoute"
import HomeRoute from "./routes/HomeRoute";
import ErrorRoute from "./routes/ErrorRoute";
import ManufacturerRoute from "./routes/ManufacturerRoute";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
    errorElement: <ErrorRoute />,
    children: [
      {
        index: true,
        element: <HomeRoute />,
      },
      {
        path: "manufacturer",
        element: <ManufacturerRoute />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
