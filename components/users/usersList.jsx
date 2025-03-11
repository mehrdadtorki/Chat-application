"use client"; // Add this if it's a client component in Next.js App Router

import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        console.log(response);
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

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full px-2">
      <h1>Users List</h1>
      <ul>
        {loading ? (
          <div className="grid gap-4">
            <div className="w-full flex items-center space-x-4">
              <Skeleton className="h-10 w-12 rounded-full" />
              <div className="w-full space-y-2">
                <Skeleton className="h-4 w-3/5" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
            <div className="w-full flex items-center space-x-4">
              <Skeleton className="h-10 w-12 rounded-full" />
              <div className="w-full space-y-2">
                <Skeleton className="h-4 w-3/5" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
            <div className="w-full flex items-center space-x-4">
              <Skeleton className="h-10 w-12 rounded-full" />
              <div className="w-full space-y-2">
                <Skeleton className="h-4 w-3/5" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </div>
        ) : (
          <>
            {users.map((user) => (
              <li key={user.id} className="pt-2">
                <Button className="w-full h-auto" variant="ghost">
                  <div className="w-full flex">
                    <div className="px-1 flex justify-center items-center">
                      <Avatar>
                        <AvatarImage src={user?.profile} />
                        <AvatarFallback>
                          {user?.username.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <div className="px-1 font-normal text-left">{user?.username}</div>
                      <div className="px-1 text-sm font-light">
                        last seen user
                      </div>
                    </div>
                  </div>
                </Button>
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default UsersList;
