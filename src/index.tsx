import * as React from "react";
import { createRoot } from 'react-dom/client';
import { App } from "./app";

const params = new URLSearchParams(window.location.search);
const docContext: 'viewing' | 'editing' = params.has("editing") ? 'editing' : 'viewing'; // make this into a tab selector?
const root = createRoot(document.getElementById("app"));
root.render(<App docContext={docContext}/>);

// need a folder view of files
