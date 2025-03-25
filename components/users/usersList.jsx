"use client"; // For Next.js App Router client component

import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data.users); // Assuming API returns { users: [...] }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (error)
    return <div className="px-4 py-2 text-red-500">Error: {error}</div>;

  return (
    <div className="w-full px-4 py-2 space-y-2">
      <h1 className="text-lg font-semibold">Users List</h1>
      {loading ? (
        <div className="flex items-center space-x-3 p-2">
          <Skeleton className="h-9 w-9 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      ) : (
        users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-2 hover:bg-muted rounded-md"
          >
            <div className="flex items-center space-x-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user?.profile} />
                <AvatarFallback>{user?.username.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium">{user?.username}</div>
                <div className="text-xs text-muted-foreground">
                  Last seen recently
                </div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="focus:outline-none">
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem>Archive Chat</DropdownMenuItem>
                <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
                <DropdownMenuItem>Block User</DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">
                  Delete Chat
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))
      )}
    </div>
  );
};

export default UsersList;
