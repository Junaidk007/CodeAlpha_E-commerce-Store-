import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const useProduct = () => {
    return useContext(ProductContext);
}

export default useProduct;