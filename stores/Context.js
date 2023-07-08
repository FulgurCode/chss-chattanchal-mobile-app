import { createContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import theme from "../styles/styles";

export const Context = createContext();

export function ContextProvider({ children }) {
  const color = useColorScheme();

  const [styles, setStyles] = useState(theme(color));
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState();
  const [isTeacherLoggedIn, setIsTeacherLoggedIn] = useState();
  const [webSocketURL, setWebsocketURL] = useState("wss://chattanchalhss.com/ws/admission-photo");

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
        setIsTeacherLoggedIn,
        webSocketURL,
        setWebsocketURL
      }}
    >
      {children}
    </Context.Provider>
  );
}
