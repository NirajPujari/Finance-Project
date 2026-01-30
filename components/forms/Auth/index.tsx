"use client";
import { useEffect, useState } from "react";
import { AuthMode } from "@Types/auth";
import { ForgotPasswordForm, LoginForm, SignUpForm } from "./forms";
import { useAuth } from "@Context/Auth";
import { useRouter } from "next/navigation";

const AuthForm = () => {
  const [page, setPage] = useState<AuthMode>("login");
  const {login, signup, forgot} = useAuth();
  const router = useRouter()

  const setMode = (mode: AuthMode) => {
    setPage(mode);
  };

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if (token){
      router.replace("/")
    }
  },[router])

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl shadow-lg border border-black/10 p-8 animate-in fade-in duration-1000">
        {page === "login" && <LoginForm setMode={setMode} login={login} />}
        {page === "register" && <SignUpForm setMode={setMode} signup={signup} />}
        {page === "forgot" && <ForgotPasswordForm setMode={setMode} forgot={forgot} />}
      </div>
    </div>
  );
};

export default AuthForm;