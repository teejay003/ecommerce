import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./context/productContext";
import { CartProvider } from "./context/CartContext";

// bookstrap vendor
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./assets/icons/all.css";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CartProvider>
      <ProductProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProductProvider>
    </CartProvider>
  </React.StrictMode>
);
