import { Input } from "@/components/ui/input";
import { LucideIcon } from "lucide-react";
import { LogInUser, SignUpUser } from "./user";

export type AuthFormProps = {
  setMode: (mode: "login" | "register" | "forgot") => void;
};

export type AuthMode = "login" | "register" | "forgot";

export type FormHeaderProps = {
  title: string;
  description: string;
};

export type InputFieldProps = {
  label: string;
  icon: LucideIcon;
} & React.ComponentProps<typeof Input>;

export type PasswordFieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  visible: boolean;
  toggle: () => void;
  id: string;
};

export type LoginFormProps = {
  logIn: (userData: LogInUser) => Promise<{ name: string; email: string }>;
};

export type SignUpFormProps = {
  signUp: (userData: SignUpUser) => Promise<{ success: boolean }>;
};

export type ForgotPasswordFormProps = {
  forgot: (email: string, password:string) => Promise<{ success: boolean }>;
};
