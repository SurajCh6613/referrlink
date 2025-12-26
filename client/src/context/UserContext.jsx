import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import BACKEND_API from "../config/config";
import { getWithExpiry, setWithExpiry } from "../helper/storageWithExpiry";
const UserContext = createContext(null);
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getWithExpiry("user"));
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BACKEND_API}/api/user/me`, {
        withCredentials: true,
      });
      setUser(res.data);
      setWithExpiry("user", res.data, 7 * 24 * 60 * 60 * 1000);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};
