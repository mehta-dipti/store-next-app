"use client";
import { UserAuth } from "./context/AuthContext";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function Page() {
  const { user } = UserAuth();

  useEffect(() => {
    if (!user) {
      redirect("/login");
    } else redirect("/dashboard");
  }, [user]);

  return <main></main>;
}
