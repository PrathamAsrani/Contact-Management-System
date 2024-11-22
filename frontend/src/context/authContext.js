import React, { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user_id: null }); // Default state for unauthenticated user

  useEffect(() => {
    const data = localStorage.getItem("auth");
    try {
      const parsedData = JSON.parse(data);
      if (parsedData) {
        setAuth({ user_id: parsedData });
      }
    } catch (err) {
      console.error("Error parsing auth data from localStorage:", err);
    }
  }, []); // Empty dependency array ensures this runs only once

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
