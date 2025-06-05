import React, { useContext, useEffect, useState } from 'react';
import Login from '/src/components/Auth/Login';
import EmployeeDashboard from "/src/components/Dashboard/EmployeeDashboard';
import AdminDashboard from './src/components/Dashboard/AdminDashboard';
import { AuthContext } from './context/AuthProvider';
import { setLocalStorage as resetDefaultData } from './utils/localStorage'; 

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);

  // Destructure adminData from context
  const { userData, adminData } = useContext(AuthContext); 

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
      const parsedData = JSON.parse(loggedInUser); // Renamed to avoid conflict
      setUser(parsedData.role);
      setLoggedInUserData(parsedData.data);
    }
  }, []);

  const handleLogin = (email, password) => {
    // Check against adminData first
    if (adminData) {
      const adminAccount = adminData.find(
        (admin) => admin.email === email && admin.password === password
      );
      if (adminAccount) {
        setUser('admin');
        // Store admin-specific data including firstName
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin', data: adminAccount }));
        setLoggedInUserData(adminAccount); // Ensure loggedInUserData is set for admin too
        return; 
      }
    }

    // Then check against employee userData
    if (userData) {
      const employee = userData.find(
        (e) => email === e.email && e.password === password
      );
      if (employee) {
        setUser('employee');
        setLoggedInUserData(employee);
        localStorage.setItem(
          'loggedInUser',
          JSON.stringify({ role: 'employee', data: employee })
        );
      } else {
        alert('Invalid Credentials'); 
      }
    } else {
      // This case might occur if userData is not yet loaded or is empty
      // and no admin match was found.
      alert('Invalid Credentials or user data not loaded.');
    }
  };

  const handleResetData = () => {
    if (window.confirm("Are you sure you want to reset all application data to defaults? This will log you out.")) {
      resetDefaultData(); 
      localStorage.removeItem('loggedInUser'); 
      window.location.reload(); 
    }
  };

  return (
    <div className="relative min-h-screen">
      {user && ( 
        <button
          onClick={handleResetData}
          title="Reset all application data to default values"
          className="fixed bottom-4 right-4 bg-gray-700 hover:bg-gray-800 text-white text-xs font-semibold py-2 px-3 rounded-lg shadow-lg z-50 transition-colors duration-150"
        >
          Reset Data
        </button>
      )}

      {!user ? (
        <Login handleLogin={handleLogin} />
      ) : user === 'admin' ? (
        <AdminDashboard changeUser={setUser} data={loggedInUserData} />
      ) : user === 'employee' ? (
        <EmployeeDashboard changeUser={setUser} data={loggedInUserData} />
      ) : null}
    </div>
  );
};

export default App;
