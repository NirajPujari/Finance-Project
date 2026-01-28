import { LogInUser, SignUpUser, User } from "@Types/user";
import { useState, useCallback } from "react";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (userData: LogInUser) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!res.ok) {
        const errorBody = await res.json().catch(() => null);
        throw new Error(errorBody?.message || "Login failed");
      }
      const data = await res.json();
      setUser({ token: data.token, name: data.name, email: data.email });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token time", new Date().toString());
      return { name: data.name, email: data.email };
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }, []);

  const signup = useCallback(async (userData: SignUpUser) => {
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const errorBody = await res.json().catch(() => null);
        throw new Error(errorBody?.message || "Signup failed");
      }

      const data = await res.json();
      console.log("Signup response:", data);

      return { success: data.success };
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(token),
      });

      if (!res.ok) {
        const errorBody = await res.json().catch(() => null);
        throw new Error(errorBody?.message || "Signup failed");
      }

      const data = await res.json();
      console.log("Logout response:", data);
      setUser(null);
      localStorage.removeItem("token");

      return { success: data.success };
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }, []);

  const autoLog = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await fetch("/api/auto", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(token),
        });
        if (!res.ok) {
          return;
        }
        const data = await res.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("token time", new Date().toString());
        setUser({ token: data.token, name: data.name, email: data.email });
        return;
      } catch (error) {
        console.error("Auto login error:", error);
        return;
      }
    }
  }, []);

  const forgot = useCallback(async (email: string) => {
    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const errorBody = await res.json().catch(() => null);
        throw new Error(errorBody?.message || "Forgot password failed");
      }

      const data = await res.json();
      console.log("Forgot password response:", data);

      return { success: data.success };
    } catch (error) {
      console.error("Forgot password error:", error);
      throw error;
    }
  }, []);

  return {
    login,
    logout,
    signup,
    autoLog,
    forgot,
    user,
  };
}
