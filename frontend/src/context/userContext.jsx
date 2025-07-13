import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  return (
    <UserContext.Provider
      value={{
        cartCount,
        setCartCount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
