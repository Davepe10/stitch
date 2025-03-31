import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Importa correctamente ReactDOM.createRoot
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
