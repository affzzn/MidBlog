import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { URL } from "../url";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const response = await axios.get(URL + "/api/auth/refetch", {
        withCredentials: true,
      });
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
