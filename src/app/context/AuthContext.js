"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { signInWithRedirect, signOut, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
    });

    return () => unsubscribe();
  }, [user]);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const googleSignOut = () => {
    signOut(auth);
  };

  return <AuthContext.Provider value={{ user, googleSignIn, googleSignOut }}>{children}</AuthContext.Provider>;
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
