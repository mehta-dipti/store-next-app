"use client";

import React, { useEffect } from "react";
import styles from "./login.module.scss";
import { Button } from "@mui/material";
import { UserAuth } from "../context/AuthContext";
import { redirect } from "next/navigation";
import { CONSTANTS } from "@/constants";

const Login = () => {
  const { googleSignIn, user } = UserAuth();

  useEffect(() => {
    if (user) redirect("/dashboard");
  }, [user]);

  const handleOnSignIn = async () => {
    try {
      await googleSignIn();
    } catch (e) {
      console.log("error signing in", e);
    }
  };

  return (
    <div className={styles.login}>
      <h1>{CONSTANTS.BRAND}</h1>
      <Button variant="outlined" onClick={handleOnSignIn}>
        {CONSTANTS.SIGNIN}
      </Button>
    </div>
  );
};

export default Login;
