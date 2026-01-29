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

export default function Navbar() {
  return (
    <nav className="shadow-md">
      <div className="flex items-center justify-end p-4 pr-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hover:bg-green-800 hover:text-white transition-colors duration-300 p-2 rounded-full">
              <User className="size-6" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-black text-white border-black">
            <DropdownMenuGroup>
              <DropdownMenuItem  className="hover:bg-green-700 transition-colors duration-300">
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem  className="hover:bg-green-700 transition-colors duration-300">
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="border-t border-gray-500"/>
            <DropdownMenuItem className="hover:bg-red-700 transition-colors duration-300">
              <LogOutButton>Log out</LogOutButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
