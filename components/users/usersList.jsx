"use client"; // For Next.js App Router client component

import { useFetch } from "@/hooks/useQuery";
import { MoreHorizontal, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";
import UserProfileModal from "../modals/UserProfileModal";

const UsersList = ({ userId }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const { data, isLoading, error } = useFetch(["users"], "/api/users", {
    headers: { "user-id": userId },
    enabled: !!userId,
  });

  if (error)
    return <div className="px-4 py-2 text-red-500">Error: {error}</div>;

  return (
    <div className="w-full max-h-3/5 px-4">
      <h1 className="text-lg font-semibold">Users List</h1>
      {isLoading ? (
        <div className="flex items-center space-x-3 p-2">
          <Skeleton className="h-9 w-9 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      ) : (
        <div className="h-full w-full overflow-auto py-2 space-y-2">
          {data?.users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-2 hover:bg-muted rounded-md"
            >
              <div className="flex items-center space-x-3">
                <Avatar className="h-9 w-9 rounded-lg">
                  <AvatarImage
                    className="h-9 w-9 rounded-lg"
                    src={user?.profile}
                  />
                  <AvatarFallback className="h-9 w-9 rounded-lg">
                    <User className="h-3/5 w-3/5 text-muted-foreground" />
                    {/* {user?.username.slice(0, 2)} */}
                  </AvatarFallback>
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
                  <button className="p-1 rounded-sm focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                    User Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>Archive Chat</DropdownMenuItem>
                  <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
                  <DropdownMenuItem>Block User</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500">
                    Delete Chat
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
          {selectedUser && (
            <UserProfileModal
              user={selectedUser}
              onClose={() => setSelectedUser(null)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default UsersList;
