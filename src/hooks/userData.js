import React from "react";
import { auth } from "../module/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const GetUserData = () => {
  const [user] = useAuthState(auth);

  return {
    user,
  };
};
export default GetUserData;
