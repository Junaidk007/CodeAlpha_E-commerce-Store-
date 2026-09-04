import { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";

const useCart = () => {
    return useContext(CartContext);
}

export default useCart;