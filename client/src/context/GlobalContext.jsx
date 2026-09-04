import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
     const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({
        success: false,
        message: ''
    })

    return (
        <GlobalContext.Provider value={{loading, setLoading, toast, setToast}}>
            {children}
        </GlobalContext.Provider>
    );
}
