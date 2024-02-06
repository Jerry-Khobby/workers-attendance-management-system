import React, { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check if the stored timestamp exists and if it's less than 4 hours old
    const storedTimestamp = localStorage.getItem('loginTimestamp');
    return storedTimestamp && Date.now() - parseInt(storedTimestamp) < 4 * 60 * 60 * 1000;
  });

  useEffect(() => {
    // Update login timestamp in local storage whenever isLoggedIn changes
    localStorage.setItem('loginTimestamp', Date.now());
  }, [isLoggedIn]);

  const contextValue = React.useMemo(() => ({ isLoggedIn, setIsLoggedIn }), [
    isLoggedIn,
    setIsLoggedIn,
  ]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
