import { Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import Home from "../features/home/pages/Home.jsx";

export const mainRoutes = (
  <Route path="/" element={<MainLayout />}>
    <Route index element={<Home />} />
  </Route>
);