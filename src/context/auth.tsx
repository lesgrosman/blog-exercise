import { ReactNode, createContext, useContext, useState } from 'react';

type AuthContextType = {
  accessToken: string | null
  setAccessToken: (state: string | null) => void
}

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: {children: ReactNode}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () =>useContext(AuthContext);
