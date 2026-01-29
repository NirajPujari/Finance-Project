import { Input } from "@Components/ui/input";
import { LucideIcon } from "lucide-react";
import { ForgotPasswordUser, LogInUser, SignUpUser } from "./user";

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
  logIn: (userData: LogInUser) => Promise<
    | {
        success: boolean;
        name: string;
        email: string;
        error?: undefined;
      }
    | {
        success: boolean;
        error: unknown;
        name?: undefined;
        email?: undefined;
      }
  >;
};

export type SignUpFormProps = {
  signUp: (userData: SignUpUser) => Promise<
    | {
        success: boolean;
        error?: undefined;
      }
    | {
        success: boolean;
        error: unknown;
      }
  >;
};

export type ForgotPasswordFormProps = {
  forgot: (userData: ForgotPasswordUser) => Promise<
    | {
        success: boolean;
        error?: undefined;
      }
    | {
        success: boolean;
        error: unknown;
      }
  >;
};
