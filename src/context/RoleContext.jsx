import { createContext, useContext, useState } from 'react';

const RoleContext = createContext();

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

export const RoleProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(() => {
    // Load role from localStorage on initialization
    const savedRole = localStorage.getItem('finsight-role');
    return savedRole || 'admin';
  });

  const switchRole = (role) => {
    setUserRole(role);
    localStorage.setItem('finsight-role', role);
  };

  return (
    <RoleContext.Provider value={{ userRole, switchRole }}>
      {children}
    </RoleContext.Provider>
  );
};
