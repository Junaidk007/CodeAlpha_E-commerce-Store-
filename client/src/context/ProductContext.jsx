import { createContext, useState, useCallback, useMemo } from "react";
import { getProduct, getProductById } from "../service/api";
import useGlobal from "../hooks/useGlobal";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const { setLoading, setToast } = useGlobal();
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);

    // Shared helper — dono fetch functions ka same try/catch/finally
    // pattern hai, isliye ek jagah likh diya taaki duplicate code na ho.
    // apiCall -> jo actual API function call karna hai
    // onSuccess -> response aane ke baad state update karne ka function
    const request = useCallback(async (apiCall, onSuccess) => {
        try {
            setLoading(true);

            // NOTE: yeh artificial delay sirf development/testing ke liye hai
            // (loading spinner dekhne ke liye). Production jaane se pehle
            // yeh line hata dena.
            // await new Promise((resolve) => setTimeout(resolve, 3000));

            const response = await apiCall();

            if (response?.data?.success) {
                onSuccess(response.data.data);
            }

            setToast({
                success: response?.data?.success,
                message: response?.data?.message,
            });
        } catch (error) {
            setToast({
                success: false,
                message: error?.response?.data?.message || "An error occurred",
            });
        } finally {
            setLoading(false);
        }
    }, [setLoading, setToast]);
    // ^ yeh function sirf tab naya banega jab setLoading ya setToast badlein
    // (jo generally stable rehte hain agar useGlobal sahi se likha hai).
    // Isse `request` ka reference stable rehta hai across re-renders.

    // useCallback: fetchProd ka reference tab tak same rahega jab tak
    // `request` khud nahi badalta. Isse ProductDetail.jsx jaisi jagah
    // pe agar isko useEffect deps array mein daala jaaye,
    // to infinite loop nahi banega (kyunki reference change nahi hoga).
    const fetchProd = useCallback(() => {
        return request(getProduct, setProducts);
    }, [request]);

    const fetchProductById = useCallback((id) => {
        return request(() => getProductById(id), setProduct);
    }, [request]);

    // useMemo: yeh object jo Provider ko value ke roop mein diya ja raha hai,
    // agar memoize na karein to har render pe NAYA object banega
    // (chahe andar ki values same hi kyun na hon), aur is context ko
    // consume karne wala HAR component unnecessarily re-render hoga.
    // useMemo isko cache karta hai — naya object tabhi banega jab
    // dependency array ki koi value actually badlegi.
    const value = useMemo(() => ({
        products,
        setProducts,
        fetchProd,
        fetchProductById,
        product,
    }), [products, fetchProd, fetchProductById, product]);

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};