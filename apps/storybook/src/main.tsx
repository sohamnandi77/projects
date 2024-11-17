import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@projects/tailwind-config/web-styles";

import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
