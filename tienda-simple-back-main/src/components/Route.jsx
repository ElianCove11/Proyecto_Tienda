import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ProductsPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import RegisterPage from "../pages/RegisterPage";
import SalesPage from "../pages/SalesPage";
import Navbar from "./Navbar";

export default function Routes_() {
  

  return (
    <BrowserRouter>
      {}
      <Routes>
        <Route
          path="login"
          element={
            
            <LoginPage />
          }
        />
        <Route path="registrarse" element={<RegisterPage />} />

        <Route
          path="/"
          element={
            
            <ProductsPage />
           
          }
        />
        <Route path="carrito" element={<CartPage />} />

        <Route path="compras" element={<SalesPage />} />

        {}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
