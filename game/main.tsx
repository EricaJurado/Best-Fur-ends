import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { PageContextProvider } from "./hooks/usePage";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PageContextProvider>
      <App />
    </PageContextProvider>
  </StrictMode>
);
