import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

// Define the shape of user data
export interface UserType {
  name: string;
  email: string;
  profilePic?: string;
  followers?: number;
  following?: number;
  bookings?: number;
}

// Define the shape of context
interface StoreContextType {
  apiBaseUrl: string;
  token: string;
  setToken: (token: string) => void;
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

// Create context
const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Define props for provider
interface StoreProviderProps {
  children: ReactNode;
}

// StoreProvider component
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

// Custom hook
export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
