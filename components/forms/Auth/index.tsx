"use client";
import { useState } from "react";
import { AuthMode } from "@Types/authForm";
import { ForgotPasswordForm, LoginForm, SignUpForm } from "./forms";
import { useAuth } from "@Hooks/use-auth";

const AuthForm = () => {
  const [page, setPage] = useState<AuthMode>("login");
  const {login, signup, forgot} = useAuth();

  const setMode = (mode: AuthMode) => {
    setPage(mode);
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl shadow-lg border border-black/10 p-8 animate-in fade-in duration-1000">
        {page === "login" && <LoginForm setMode={setMode} logIn={login} />}
        {page === "register" && <SignUpForm setMode={setMode} signUp={signup} />}
        {page === "forgot" && <ForgotPasswordForm setMode={setMode} forgot={forgot} />}
      </div>
    </div>
  );
};

export default AuthForm;