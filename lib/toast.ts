import { ToastProps } from "@Types/toast";
import { toast } from "sonner";

const baseToastStyle = {
  color: "white",
  borderRadius: "10px",
};

export const successToast = ({
  message,
  description,
  position,
}: ToastProps) => {
  toast(message, {
    description,
    richColors: true,
    style: {
      ...baseToastStyle,
      background: "#16a34a", // green
    },
    position,
  });
};

export const errorToast = ({ message, description, position }: ToastProps) => {
  toast(message, {
    description,
    richColors: true,
    style: {
      ...baseToastStyle,
      background: "#dc2626", // red
    },
    position,
  });
};

export const warningToast = ({
  message,
  description,
  position,
}: ToastProps) => {
  toast(message, {
    description,
    richColors: true,
    style: {
      ...baseToastStyle,
      background: "#f59e0b", // amber
      color: "#111827",
    },
    position,
  });
};

export const defaultToast = ({
  message,
  description,
  position,
}: ToastProps) => {
  toast(message, {
    description,
    style: {
      background: "#111827",
      color: "white",
      borderRadius: "10px",
    },
    position,
  });
};
