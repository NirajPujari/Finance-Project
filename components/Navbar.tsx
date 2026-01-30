"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@Components/ui/dropdown-menu";
import { User } from "lucide-react";
import Link from "next/link";
import LogOutButton from "./LogOutButton";
import { useAuth } from "@Context/Auth";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const { user, autoLog } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenTime = localStorage.getItem("token time");

    if (user) return;

    if (!token || !tokenTime) {
      router.push("/login");
      return;
    }

    const savedTime = new Date(tokenTime).getTime();
    const threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1000;

    if (savedTime > threeDaysAgo || pathname.startsWith("/")) {
      autoLog();
    }
  }, [user, autoLog, router, pathname]);

  return (
    <nav className="shadow-md">
      <div className="flex items-center justify-between p-4 pr-6">
        <h2 className="font-bold text-lg pl-10 md:pl-0 flex gap-1">
          <span className="hidden md:block">Welcome back,</span>
          {user && user.name ? user.name : "User."}
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hover:bg-green-800 hover:text-white transition-colors duration-300 p-2 rounded-full">
              <User className="size-6" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-black text-white border-black">
            <DropdownMenuGroup>
              <DropdownMenuItem className="hover:bg-green-700 transition-colors duration-300">
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-green-700 transition-colors duration-300">
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="border-t border-gray-500" />
            <DropdownMenuItem className="hover:bg-red-700 transition-colors duration-300">
              <LogOutButton>Log out</LogOutButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
