import { useReducer } from "react"; 
import appReducer from "./AppReducer";

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);
  }