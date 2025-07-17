import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';

<<<<<<< HEAD
// ✅ Updated: Define the shape of user data including _id
=======
>>>>>>> 3d894fd (coomit)
export interface UserType {
  _id: string;
  email: string;
  name?: string;
  profilePic?: string;
  followers?: number;
  following?: number;
  bookings?: number;
}


interface StoreContextType {
  apiBaseUrl: string;
  token: string;
  setToken: (token: string) => void;
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}


const StoreContext = createContext<StoreContextType | undefined>(undefined);

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [apiBaseUrl] = useState('https://grooviti-backend.onrender.com');
  const [token, setToken] = useState<string>('');
  const [user, setUser] = useState<UserType | null>(null);

  return (
    <StoreContext.Provider value={{ apiBaseUrl, token, setToken, user, setUser }}>
      {children}
    </StoreContext.Provider>
  );
};


export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
