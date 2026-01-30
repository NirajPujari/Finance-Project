import { Input } from "@Components/ui/input";
import {
  FormHeaderProps,
  InputFieldProps,
  PasswordFieldProps,
} from "@Types/auth";
import { Eye, EyeOff, Lock } from "lucide-react";

export const FormHeader = ({ title, description }: FormHeaderProps) => (
  <header className="flex flex-col gap-4">
    <h1 className="text-2xl font-bold">{title}</h1>
    <p className="text-sm text-gray-500">{description}</p>
  </header>
);

export const InputField = ({
  label,
  icon: Icon,
  ...props
}: InputFieldProps) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={props.id} className="text-sm font-bold">
      {label}
    </label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 size-4" />
      <Input className="border-black/25 pl-8" {...props} />
    </div>
  </div>
);

export const PasswordField = ({
  label,
  value,
  onChange,
  visible,
  toggle,
  id,
}: PasswordFieldProps) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className="text-sm font-bold">
      {label}
    </label>
    <div className="relative">
      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 size-4" />
      <Input
        id={id}
        type={visible ? "text" : "password"}
        className="border-black/25 px-8"
        placeholder="••••••••"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  </div>
);
