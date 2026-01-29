import {
  AuthFormProps,
  LoginFormProps,
  SignUpFormProps,
  ForgotPasswordFormProps,
} from "@Types/authForm";
import { useState } from "react";
import { FormHeader, InputField, PasswordField } from "./AuthFields";
import { ArrowLeft, Mail, User } from "lucide-react";
import { Input } from "@Components/ui/input";
import { errorToast, successToast } from "@Lib/toast";
import { useRouter } from "next/navigation";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()[\]{}\-_=+|\\:;"'<>,./~`]).{8,}$/;

export const LoginForm = ({
  setMode,
  logIn,
}: AuthFormProps & LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const router = useRouter();

  const setLoginDataField = (field: string, value: string) => {
    setLoginData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailRegex.test(loginData.email)) {
      errorToast({
        message: "Enter a correct email address.",
        position: "top-right",
      });
      return;
    }
    if (!passwordRegex.test(loginData.password)) {
      errorToast({
        message: "Invalid Password",
        description:
          "Password should contain atleast 1 Capital, 1 Small, 1 Special Character and 1 Digit.",
        position: "top-right",
      });
      return;
    }
    const data = await logIn({
      email: loginData.email,
      password: loginData.password,
    });
    if (data.success) {
      successToast({
        message:
          "Welcome back " +
          data.name?.slice(0, 1).toLocaleUpperCase() +
          data.name?.slice(1),
      });
      router.replace("/");
    } else {
      errorToast({
        message: "There is a error in login.",
        description: "Try Again Later.",
        position: "top-right",
      });
      router.refresh();
    }
  };

  return (
    <>
      <FormHeader
        title="Welcome Back"
        description="Sign in to access your financial dashboard"
      />
      <form className="my-10 flex flex-col gap-4" onSubmit={handleLogin}>
        <InputField
          label="Email Address"
          icon={Mail}
          id="email"
          type="email"
          placeholder="example@example.com"
          value={loginData.email}
          onChange={(e) => setLoginDataField("email", e.target.value)}
        />
        <PasswordField
          label="Password"
          value={loginData.password}
          onChange={(v) => setLoginDataField("password", v)}
          visible={showPassword}
          toggle={() => setShowPassword((v) => !v)}
          id="password"
        />
        <div className="w-full flex justify-end">
          <button
            className="text-sm text-green-700 hover:underline font-medium"
            onClick={() => setMode("forgot")}
          >
            Forgot Password?
          </button>
        </div>
        <div className="mx-2">
          <button
            className="w-full text-sm bg-black text-white py-2 rounded-lg hover:bg-black/70 transition-colors font-bold duration-300 cursor-pointer"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
      <footer className="flex justify-center gap-2 text-sm font-medium">
        Don&apos;t have an account?
        <button
          className="text-green-700 hover:underline"
          onClick={() => setMode("register")}
        >
          Sign Up
        </button>
      </footer>
    </>
  );
};

export const SignUpForm = ({
  setMode,
  signUp,
}: AuthFormProps & SignUpFormProps) => {
  const [showPassword, setShowPassword] = useState([false, false]);
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    checkTerms: false,
  });

  const setSignUpDataField = (field: string, value: string) => {
    if (field == "name") {
      value = value.replace(/\b\w/g, (char) => char.toUpperCase());
    }
    setSignUpData((prev) => ({ ...prev, [field]: value }));
  };

  const setCheckTerms = () => {
    setSignUpData((prev) => ({ ...prev, checkTerms: !signUpData.checkTerms }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signUpData.name == "") {
      errorToast({
        message: "Enter a Name.",
        position: "top-right",
      });
      return;
    }
    if (!emailRegex.test(signUpData.email)) {
      errorToast({
        message: "Enter a correct email address.",
        position: "top-right",
      });
      return;
    }
    if (!passwordRegex.test(signUpData.password)) {
      errorToast({
        message: "Invalid Password",
        description:
          "Password should contain atleast 1 Capital, 1 Small, 1 Special Character and 1 Digit.",
        position: "top-right",
      });
      return;
    }
    if (signUpData.password !== signUpData.confirmPassword) {
      errorToast({
        message: "Password are not same.",
        position: "top-right",
      });
      return;
    }
    if (!signUpData.checkTerms) {
      errorToast({
        message: "Please check the terms and conditions.",
        position: "top-right",
      });
      return;
    }
    const data = await signUp({
      name: signUpData.name,
      email: signUpData.email,
      password: signUpData.password,
    });
    if (data.success) {
      successToast({
        message: "Thank you for joining us " + signUpData.name,
      });
      window.location.reload();
    } else {
      errorToast({
        message: "There is a error in signup. " + data.error,
        description: "Try Again Later.",
        position: "top-right",
      });
    }
  };
  return (
    <>
      <FormHeader
        title="Create Your Account"
        description="Start managing your finances today"
      />
      <form className="my-5 flex flex-col gap-4" onSubmit={handleSignUp}>
        <InputField
          label="Name"
          icon={User}
          id="name"
          type="text"
          placeholder="John Doe"
          value={signUpData.name}
          onChange={(e) => setSignUpDataField("name", e.target.value)}
        />
        <InputField
          label="Email Address"
          icon={Mail}
          id="email"
          type="email"
          placeholder="example@example.com"
          value={signUpData.email}
          onChange={(e) => setSignUpDataField("email", e.target.value)}
        />
        <PasswordField
          label="Password"
          value={signUpData.password}
          onChange={(v) => setSignUpDataField("password", v)}
          visible={showPassword[0]}
          toggle={() => setShowPassword((v) => [!v[0], v[1]])}
          id="password"
        />
        <PasswordField
          label="Confirm Password"
          value={signUpData.confirmPassword}
          onChange={(v) => setSignUpDataField("confirmPassword", v)}
          visible={showPassword[1]}
          toggle={() => setShowPassword((v) => [v[0], !v[1]])}
          id="confirmPassword"
        />
        <div>
          <label className="inline-flex items-center gap-2">
            <Input
              type="checkbox"
              checked={signUpData.checkTerms}
              onChange={setCheckTerms}
              className="h-4 w-4 accent-black border-black/25 rounded "
            />
            <span className="text-sm font-medium">
              I agree to the{" "}
              <a href="#" className="text-green-700 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-green-700 hover:underline">
                Privacy Policy
              </a>
              .
            </span>
          </label>
        </div>
        <div className="mx-2">
          <button
            className="w-full text-sm bg-black text-white py-2 rounded-lg hover:bg-black/70 transition-all font-bold duration-500 disabled:opacity-50"
            type="submit"
            disabled={!signUpData.checkTerms}
          >
            Create Account
          </button>
        </div>
      </form>
      <footer className="flex justify-center gap-2 text-sm font-medium">
        Already have an account?
        <button
          className="text-green-700 hover:underline"
          onClick={() => setMode("login")}
        >
          Sign In
        </button>
      </footer>
    </>
  );
};

export const ForgotPasswordForm = ({
  setMode,
  forgot,
}: AuthFormProps & ForgotPasswordFormProps) => {
  const [showPassword, setShowPassword] = useState([false, false]);
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const setForgotPasswordDataField = (field: string, value: string) => {
    setForgotPasswordData((prev) => ({ ...prev, [field]: value }));
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailRegex.test(forgotPasswordData.email)) {
      errorToast({
        message: "Enter a correct email address.",
        position: "top-right",
      });
      return;
    }
    if (!passwordRegex.test(forgotPasswordData.password)) {
      errorToast({
        message: "Invalid Password",
        description:
          "Password should contain atleast 1 Capital, 1 Small, 1 Special Character and 1 Digit.",
        position: "top-right",
      });
      return;
    }
    if (forgotPasswordData.password !== forgotPasswordData.confirmPassword) {
      errorToast({
        message: "Password are not same.",
        position: "top-right",
      });
      return;
    }
    const data = await forgot({
      email: forgotPasswordData.email,
      password: forgotPasswordData.password,
    });
    if (data.success) {
      successToast({
        message: "Your Password is been changed.",
      });
      window.location.reload();
    } else {
      errorToast({
        message: "There is a error in changing your password. " + data.error,
        description: "Try Again Later.",
        position: "top-right",
      });
    }
  };
  return (
    <>
      <FormHeader
        title="Reset Your Password"
        description="We'll help you recover your account"
      />
      <p className="text-sm text-gray-500 my-5">
        Enter the email address associated with your account and we&apos;ll send
        you a link to reset your password.
        <br />
        (For demo purposes, you can directly set a new password below.)
      </p>
      <form
        className="my-5 flex flex-col gap-4"
        onSubmit={handleForgotPassword}
      >
        <InputField
          label="Email Address"
          icon={Mail}
          id="email"
          type="email"
          placeholder="example@example.com"
          value={forgotPasswordData.email}
          onChange={(e) => setForgotPasswordDataField("email", e.target.value)}
        />
        <PasswordField
          label="Password"
          value={forgotPasswordData.password}
          onChange={(v) => setForgotPasswordDataField("password", v)}
          visible={showPassword[0]}
          toggle={() => setShowPassword((v) => [!v[0], v[1]])}
          id="password"
        />
        <PasswordField
          label="Confirm Password"
          value={forgotPasswordData.confirmPassword}
          onChange={(v) => setForgotPasswordDataField("confirmPassword", v)}
          visible={showPassword[1]}
          toggle={() => setShowPassword((v) => [v[0], !v[1]])}
          id="confirmPassword"
        />
        <div className="mx-2">
          <button
            className="w-full text-sm bg-black text-white py-2 rounded-lg hover:bg-black/70 transition-all font-bold duration-500"
            type="submit"
          >
            Reset Password
          </button>
        </div>
        <div className="mx-2">
          <button
            className="w-full text-sm bg-white text-black py-2 rounded-lg hover:bg-black/10 transition-all font-bold duration-500 shadow-md border border-black/10"
            onClick={() => setMode("login")}
          >
            <ArrowLeft className="mr-2 inline-block" /> Back to sign in
          </button>
        </div>
      </form>
    </>
  );
};
