"use client";


import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; 
import { logoutUser } from "@/services/auth/logoutUser";
import { IUser } from "@/types/userTypes";
import { Settings } from "lucide-react";
import Link from "next/link";

interface UserDropdownProps {
  user: IUser;
}

const UserDropdown = ({ user }: UserDropdownProps) => {
   
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <span className="text-sm font-semibold">
            {user.name.charAt(0).toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
            <p className="text-xs text-primary capitalize">
              {user.role}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator /> 
        <DropdownMenuItem asChild>
          <Link href={"/reset-password"} className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            Change Password
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
        //   onClick={handleLogout}
        //   className="cursor-pointer text-red-500"
        >
          <Button onClick={()=>logoutUser()} className="bg-red-500  hover:bg-red-600">
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;