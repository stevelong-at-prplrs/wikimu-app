import * as React from "react";
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppRoot } from "./app-root";
import { ViewDocument } from "./components/ViewDocument";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppRoot />,
  },
  {
    path: "/:id",
    element: <ViewDocument />
  }
]);

const root = createRoot(document.getElementById("app"));
root.render(<RouterProvider router={router} />);
