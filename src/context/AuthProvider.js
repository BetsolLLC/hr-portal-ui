import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(
      localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : {}
    );
  }, []);
  const setUserInfo = (userInfo) => {
    setUser(userInfo);
  };
  return (
    <AuthContext.Provider value={{ user, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
