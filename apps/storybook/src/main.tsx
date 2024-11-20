import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "~/styles/global.css";

import App from "./App";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  throw new Error("Root element not found");
}
