"use client";

import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../button";

const LogoutButton = () => {
  const { data: session } = useSession();

  // Only show logout button if user is authenticated
  if (!session) return null;

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: "/auth/login" });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Button onClick={handleLogout} variant="ghost" className="w-full p-1">
      <LogOut />
      Logout
    </Button>
  );
};

export default LogoutButton;
