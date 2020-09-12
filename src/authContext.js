import {createContext, useContext} from 'react';

const AuthContext = createContext({user: null});

AuthContext.displayName = 'AuthContext';

export const AuthProvider = AuthContext.Provider;
export const AuthConsumer = AuthContext.Consumer;

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
