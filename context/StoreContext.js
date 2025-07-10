//import React, { createContext, useContext, useState } from 'react';

// const StoreContext = createContext();

// export const StoreProvider = ({ children }) => {
//   const [apiBaseUrl] = useState('https://grooviti-backend.onrender.com');
//   const [token, setToken] = useState(null);

//   return (
//     <StoreContext.Provider value={{ apiBaseUrl, token, setToken }}>
//       {children}
//     </StoreContext.Provider>
//   );
// };

//export const useStore = () => useContext(StoreContext);
import React, { createContext, useContext, useState } from 'react';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [apiBaseUrl] = useState('https://grooviti-backend.onrender.com'); // ⬅️ put your Render backend URL here
  const [token, setToken] = useState('');

  return (
    <StoreContext.Provider value={{ apiBaseUrl, token, setToken }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
