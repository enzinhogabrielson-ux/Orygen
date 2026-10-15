import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";

// Com base relativa (pré-visualização em subpasta), usa rotas por # para não cair na 404.
const Router = import.meta.env.BASE_URL === "./" ? HashRouter : BrowserRouter;
import App from "./App.jsx";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
);
