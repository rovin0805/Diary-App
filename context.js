import React, { createContext, useContext } from "react";

export const DBContext = createContext();

export const DBContextProvider = ({ children, value }) => {
  return <DBContext.Provider value={value}>{children}</DBContext.Provider>;
};

export const useDB = () => {
  return useContext(DBContext);
};
