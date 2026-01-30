"use client";
import { errorToast, successToast } from "@Lib/toast";
import { useAuth } from "@Context/Auth";
import { LogOutButtonProps } from "@Types/button";
import { useRouter } from "next/navigation";

const LogOutButton = ({ children, className }: LogOutButtonProps) => {
  const { logout } = useAuth();
  const router = useRouter()

  const logoutOnClick = async () => {
    const data = await logout();
    if (data.success) {
      successToast({
        message: "Successfully Logout.",
      });
      router.replace("/login");
    } else {
      errorToast({
        message: "There is a error in logging. " + data.error,
        description: "Try Again Later.",
        position: "top-right",
      });
    }
  };
  return <button className={className} onClick={logoutOnClick}>{children}</button>;
};

export default LogOutButton;
