import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Toaster
      position="top-center"
      containerStyle={{
        top: 20,
      }}
      toastOptions={{
        className: "!text-sm !font-medium",
        duration: 4000,
      }}
    />
    <App />
  </BrowserRouter>,
);
