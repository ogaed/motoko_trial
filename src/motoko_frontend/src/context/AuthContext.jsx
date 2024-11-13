import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { motoko_backend } from '../../../declarations/motoko_backend';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authClient, setAuthClient] = useState(null);
  const [user, setUser] = useState({
    isAuthenticated: false,
    role: null,
    principal: null
  });

  useEffect(() => {
    initAuth();
  }, []);

  const initAuth = async () => {
    const client = await AuthClient.create();
    setAuthClient(client);

    if (await client.isAuthenticated()) {
      const identity = client.getIdentity();
      const principal = identity.getPrincipal();
      const userRole = await motoko_backend.getUserRole(principal);
      
      setUser({
        isAuthenticated: true,
        role: userRole,
        principal: principal.toString()
      });
    }
  };

  const login = async (role, testIdentity) => {
    console.log('AuthContext - Setting user with role:', role);
    console.log('AuthContext - Using identity:', testIdentity);
    
    setUser({
      isAuthenticated: true,
      role: role,
      principal: testIdentity
    });
    
    console.log('AuthContext - User state updated:', {
      isAuthenticated: true,
      role: role,
      principal: testIdentity
    });
  };

  const logout = async () => {
    if (authClient) {
      await authClient.logout();
      setUser({
        isAuthenticated: false,
        role: null,
        principal: null
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 