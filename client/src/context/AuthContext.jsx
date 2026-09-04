import { createContext, useState } from "react";
import useGlobal from "../hooks/useGlobal";
import { signup, signin } from "../service/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const {loading, setLoading, toast, setToast} = useGlobal();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
   

    const signUp = async (userData) => {
        try {
            setLoading(true);
            const response = await signup(userData);
            console.log(response);
            setToast({
                success: response.data.success,
                message: response.data.message
            })
        }
        catch (error) {
            setToast({
                success: false,
                message: error?.response?.data?.message || "An error occurred",
            })
        }
        finally {
            setLoading(false);
        }
    };

    const signIn = async (userData) => {
        try {
            setLoading(true);
            const response = await signin(userData);
            if (response.data.success == true) {
                setToken(response.data.data.token);
                setUser(response.data.data.user);
                localStorage.setItem('token', response.data.data.token);
            }
            setToast({
                success: response.data.success,
                message: response.data.message
            });
        }
        catch (error) {
            setToast({
                success: false,
                message: error?.response?.data?.message || "An error occurred",
            });
        }
        finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, token, signUp, signIn, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
