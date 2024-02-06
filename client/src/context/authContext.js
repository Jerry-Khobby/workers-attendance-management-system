import React, { useState, useEffect, createContext,useContext } from 'react';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem('isLoggedIn') === 'true' || false
  );

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  const contextValue = React.useMemo(() => ({isLoggedIn, setIsLoggedIn }), [
    isLoggedIn,
    setIsLoggedIn,
  ]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};



export const useAuthContext=()=>{
  return useContext(AuthContext)
}