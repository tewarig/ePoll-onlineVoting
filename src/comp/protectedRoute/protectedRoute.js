import React, { useEffect } from "react";
import { auth } from "../../module/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading, error]);

 
  if (user) return <div>{children}</div>;
}

export default ProtectedRoute;
