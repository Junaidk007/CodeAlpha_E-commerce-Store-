import { createContext, useContext, useState, useMemo, useCallback } from "react";
import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";

const UIContext = createContext(null);

export const UIProvider = ({ children }) => {
  const [toastMessage, setToastMessage] = useState("");

  const showToast = useCallback((msg, duration = 3500) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, duration);
  }, []);

  const value = useMemo(
    () => ({
      toastMessage,
      showToast,
      setToastMessage,
    }),
    [toastMessage, showToast]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within an AppProvider / UIProvider");
  }
  return context;
};

// Master AppProvider composing all context providers cleanly
export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>
        <UIProvider>{children}</UIProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export const useAppContext = () => {
  const ui = useUI();
  return {
    ...ui,
  };
};

export default AppProvider;
