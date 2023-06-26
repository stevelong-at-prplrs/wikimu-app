import * as React from "react";
import { createRoot } from 'react-dom/client';
import { App } from "./app";

const docContext: 'viewing' | 'editing' = 'editing';
const root = createRoot(document.getElementById("app"));
root.render(<App docContext={docContext}/>);
