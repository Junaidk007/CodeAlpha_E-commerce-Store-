import { Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import Home from "../features/home/pages/Home.jsx";
import ProductDetail from "../features/ProductDetail/pages/ProductDetail.jsx";
import Checkout from "../features/Checkout/pages/Checkout.jsx";
import AuthPage from "../features/Auth/pages/AuthPage.jsx";

export const mainRoutes = (
  <Route path="/" element={<MainLayout />}>
    <Route index element={<Home />} />
    <Route path="product/:id" element={<ProductDetail />} />
    <Route path="checkout/cart" element={<Checkout />} />
    <Route path="account/auth" element={<AuthPage />} />
  </Route>
);  