import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
const UserContext = createContext();
export const useUser = () => useContext(UserContext);
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/user/me", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};
