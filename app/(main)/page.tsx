"use client";

import { useEffect } from "react";
import { useAuth } from "@Hooks/use-auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, autoLog } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // const token = localStorage.getItem("token");
    // const tokenTime = localStorage.getItem("token time");

    // if (user) return;

    // if (!token || !tokenTime) {
    //   router.push("/login");
    //   return;
    // }

    // const savedTime = new Date(tokenTime).getTime();
    // const threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1000;

    // if (savedTime > threeDaysAgo) {
    //   autoLog();
    // } else {
    //   router.push("/login");
    // }
  }, [user, autoLog, router]);

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <h1 className="text-4xl font-bold">
        {user ? `Welcome ${user.name}` : "Loading..."}
      </h1>
    </div>
  );
}
