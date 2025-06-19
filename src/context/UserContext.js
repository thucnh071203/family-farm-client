import React, { createContext, useContext, useState, useEffect } from "react";
import instance from "../Axios/axiosConfig";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storage = localStorage.getItem("accessToken") ? localStorage : sessionStorage;
        const storedData = storage.getItem("profileData");
        if (storedData) {
          setUser(JSON.parse(storedData));
        }

        const token = storage.getItem("accessToken");
        if (token) {
          const response = await instance.get("/api/account/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.status === 200) {
            const data = response.data.data;
            setUser(data);
            storage.setItem("profileData", JSON.stringify(data));
            storage.setItem("avatarUrl", data.avatar);
            storage.setItem("fullName", data.fullName);
          }
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const updateUser = (newData) => {
    setUser((prev) => {
      const updatedUser = { ...prev, ...newData };
      const storage = localStorage.getItem("accessToken") ? localStorage : sessionStorage;
      storage.setItem("profileData", JSON.stringify(updatedUser));
      storage.setItem("avatarUrl", newData.avatar || prev.avatar);
      storage.setItem("fullName", newData.fullName || prev.fullName);
      return updatedUser;
    });
  };

  return (
    <UserContext.Provider value={{ user, updateUser, isLoading }}>
      {isLoading ? <div>Loading...</div> : children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);