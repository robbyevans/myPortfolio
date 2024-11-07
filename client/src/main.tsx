import React from "react";
import { createRoot } from "react-dom/client";
import "./global.scss";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(<App />);
