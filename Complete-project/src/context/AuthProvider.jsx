import React, { createContext, useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    let { employees, admin } = getLocalStorage();

    // If localStorage is empty (manually cleared) or data is missing, reset it
    if (!employees || !admin) {
      console.log("LocalStorage is empty or incomplete. Resetting...");
      setLocalStorage();
      // Re-fetch after resetting
      const updatedStorage = getLocalStorage();
      employees = updatedStorage.employees;
      admin = updatedStorage.admin;
    }

    // Set the userData state with the employees from localStorage
    if (employees) {
      setUserData(employees);
    }
    // Set the adminData state with the admin accounts from localStorage
    if (admin) {
      setAdminData(admin);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userData, setUserData, adminData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
