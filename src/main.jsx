import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Self-hosted variable fonts (latin subset is the only one French needs).
import "@fontsource-variable/inter/wght.css";
import "@fontsource-variable/jetbrains-mono/wght.css";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
