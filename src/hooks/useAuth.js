import React, { useContext } from "react";
import { AuthContext } from "../context";

export default function useAuth() {
  const { auth, setAuth } = useContext(AuthContext);
  return { auth, setAuth };
}
