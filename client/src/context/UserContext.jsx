import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import BACKEND_API from "../config/config";
const UserContext = createContext(null);
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BACKEND_API}/api/user/me`, {
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
