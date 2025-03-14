import { createRoot } from "react-dom/client";
import "./style.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Toaster position="top-center" />
    <App />
  </BrowserRouter>
);
