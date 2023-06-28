import * as React from "react";
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppRoot } from "./app-root";
import { ViewDocument } from "./components/ViewDocument";

// const id = '6498a352835cd46dc03dbf76';

// const params = new URLSearchParams(window.location.search);
// const docContext: 'viewing' | 'editing' = params.has("editing") ? 'editing' : 'viewing'; // make this into a tab selector?
// const [docContext, setDocContext] = React.useState('viewing');

// const docContext: 'viewing' | 'editing' = 'viewing';

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

// need a folder view of files
