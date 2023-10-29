"use client";
import styles from "@/app/dashboard/dashboard.module.scss";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { CONSTANTS } from "@/constants";

export default function RootLayout({ children }) {
  const { user, googleSignOut } = UserAuth();

  useEffect(() => {
    if (!user) redirect("/login");
  }, [user]);

  const handleOnSignOut = async () => {
    try {
      await googleSignOut();
    } catch (e) {
      console.log("error signing out", e);
    }
  };

  return (
    <div className={styles.layout}>
      <nav>
        <h6>{CONSTANTS.BOOK_APPOINMENT}</h6>
        <h6 onClick={handleOnSignOut}>{CONSTANTS.SIGNOUT}</h6>
      </nav>
      {children}
    </div>
  );
}
