import { createContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import theme from "../styles/styles";

export const Context = createContext();

export function ContextProvider({ children }) {
  const color = useColorScheme();

  const [styles, setStyles] = useState(theme(color))
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState();
  const [isTeacherLoggedIn, setIsTeacherLoggedIn] = useState();

  useEffect(() => {
    setStyles(theme(color));
  }, [color]);

  return (
    <Context.Provider
      value={{
        styles,
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        isTeacherLoggedIn,
        setIsTeacherLoggedIn
      }}
    >
      {children}
    </Context.Provider>
  );
}
