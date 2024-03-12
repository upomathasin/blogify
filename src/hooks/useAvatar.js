import React from "react";
import useAuth from "./useAuth";
import { useParams } from "react-router-dom";
import useProfile from "./useProfile";

export default function useAvatar() {
  const { auth } = useAuth();
  const { state } = useProfile();

  const avatar = state?.user?.avatar ?? auth?.user?.firstName.slice(0, 1);
  return { avatar };
}
