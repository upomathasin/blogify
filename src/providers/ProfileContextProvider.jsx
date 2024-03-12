import React, { useReducer } from "react";
import { ProfileContext } from "../context";
import useAuth from "../hooks/useAuth";
import { ProfileReducer, initialState } from "../reducers/ProfileReducer";

export default function ProfileContextProvider({ children }) {
  const { auth, setAuth } = useAuth();

  const [state, dispatch] = useReducer(ProfileReducer, initialState);

  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
}
