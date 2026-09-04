
import { Routes } from "react-router-dom";
import { mainRoutes } from "./routes/MainRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { GlobalProvider } from "./context/GlobalContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

function App() {
  return (
    <>
      <GlobalProvider>
        <AuthProvider>
          <ProductProvider>
            <CartProvider>
            <Routes>
              {mainRoutes}
            </Routes>
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
      </GlobalProvider>
    </>
  );
}

export default App;
