import React, { useState, useEffect } from "react";
import { auth, db } from "../module/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
const useUserPolls = () => {
  const [user, isLoading] = useAuthState(auth);
  const [polls, setPolls] = useState([]);
  async function getData() {
    const email = user.email;

    const dbQuery = query(collection(db, "polls"), where("email", "==", email));
    const data = await getDocs(dbQuery);
    console.log("Data", data);
    setPolls(data.docs);
  }
  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user]);

  return {
    polls,
  };
};

export default useUserPolls;
