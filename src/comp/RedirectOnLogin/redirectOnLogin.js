import React, { useEffect } from "react";
import { auth } from "../../module/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Router, useNavigate } from "react-router-dom";

function RedirectOnlogin({ routeLink, children }) {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && user) {
      navigate(routeLink);
    }
  }, [user, loading, error]);
  return <>{children}</>;
}

export default RedirectOnlogin;
