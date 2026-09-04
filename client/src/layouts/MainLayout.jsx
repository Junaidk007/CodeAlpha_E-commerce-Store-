import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Toast from "../components/Toast";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import useGlobal from "../hooks/useGlobal";
import useCart from "../hooks/useCart";

function MainLayout() {
    const { toast, setToast } = useGlobal();
    const {fetchCart} = useCart();
    
    useEffect(() => {
        fetchCart();
    }, []);

    useEffect(() => {
    if (!toast.message) return;

    const timer = setTimeout(() => {
        setToast({
            message: "",
            success: null
        });
    }, 3000);

    return () => clearTimeout(timer);
}, [toast.message, setToast]);

    return (
        <>
            <Navbar />
            <Toast message={toast.message} success={toast.success}/>
            <Outlet />
            <Footer />
        </>
    );
}

export default MainLayout;