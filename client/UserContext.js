import { createContext } from "react";

export const UserContext = createContext({
  id: null,
  username: "",
  setUser: () => {},
});