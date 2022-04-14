import { createContext, useContext, useReducer, useState } from "react";
import { authReducer, authInitialState } from "../reducer/authReducer";
import { AuthContextType, Children } from "../utils/types";

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: Children) => {
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);

  const [networkLoader, setNetworkLoader] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        authState,
        authDispatch,
        networkLoader,
        setNetworkLoader,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
