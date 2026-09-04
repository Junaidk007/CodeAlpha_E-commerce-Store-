import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const useGlobal = () => {
    return useContext(GlobalContext);
}

export default useGlobal;