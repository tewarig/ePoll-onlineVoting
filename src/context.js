import { createContext, useContext, useState } from "react";
import getUserPolls from "../src/hooks/getUserPolls";

const User = createContext();
const Context = ({ children }) => {
  const { polls } = getUserPolls();
  return <User.Provider value={polls}>{children}</User.Provider>;
};

export const UserState = () => {
  return useContext(User);
};
export default Context;
