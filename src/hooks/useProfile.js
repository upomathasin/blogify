import React, { useContext } from "react";
import { ProfileContext } from "../context";

export default function useProfile() {
  const { state, dispatch } = useContext(ProfileContext);
  return { state, dispatch };
}
