import { createContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

import theme from "../styles/styles"
// console.log(styles)



export const Context = createContext();

export function ContextProvider({ children }) {
  const color = useColorScheme();

  const [styles, setStyles] = useState(theme(color));
  
  useEffect(()=>{
    setStyles(theme(color))
  }, [color])

  return (
    <Context.Provider
      value={{
        styles,
      }}
    >
      {children}
    </Context.Provider>
  );
}
