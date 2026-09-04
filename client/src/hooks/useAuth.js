import { useContext } from "react";
import { AuthContext } from "../context/authContext.jsx";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;