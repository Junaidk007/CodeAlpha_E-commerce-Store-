import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  // Synchronize state changes to localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = useCallback((authData) => {
    // Expecting authData to contain user & token or data object from API
    const userToken = authData?.token || authData?.data?.token || authData;
    const userData = authData?.user || authData?.data?.user || null;

    if (typeof userToken === "string") {
      setToken(userToken);
    }
    if (userData) {
      setUser(userData);
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");
  }, []);

  const isAuthenticated = Boolean(token);

  // Memoize value to optimize rendering performance for consumers
  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated,
      loading,
      setLoading,
      login,
      logout,
      setUser,
    }),
    [user, token, isAuthenticated, loading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
