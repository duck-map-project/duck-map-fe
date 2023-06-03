import { createContext, ReactNode, useContext } from 'react';

import { useAuth, Auth } from '../hooks/useAuth';

const AuthContext = createContext<Auth | null>(null);

const useAuthContext = (): Auth | null => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export { useAuthContext, AuthProvider };
