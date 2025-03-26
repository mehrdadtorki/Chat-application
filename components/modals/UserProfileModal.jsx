"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import {
  Calendar,
  Mail,
  MessageCircle,
  MoreVertical,
  Phone,
  Search,
} from "lucide-react";
import Image from "next/image";
import defaultBanner from "../../public/static/illustration/banner.svg";
import { format } from "date-fns";

const UserProfileModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <Dialog open={!!user} onOpenChange={onClose}>
      <DialogContent className="w-large p-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Banner */}
          <div className="relative w-full h-60">
            <Image
              src={defaultBanner}
              alt="Background"
              layout="fill"
              objectFit="cover"
              style={{ transform: "rotate(180deg)" }}
            />

            {/* Avatar with SVG Border */}
            <div className="absolute top-3/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Thin Gradient Border & Shadow */}
                <div
                  className="absolute inset-0 w-full h-full rounded-full 
                    before:absolute before:inset-0 before:rounded-full before:border-2 
                    before:border-transparent before:bg-gradient-to-r before:from-blue-300 
                    before:via-white before:to-blue-300 before:p-[2px] before:shadow-md 
                    before:shadow-blue-300"
                />

                {/* Avatar */}
                <Avatar className="relative w-29 h-29 shadow-md">
                  <AvatarImage src={user.profile} alt={user.username} />
                  <AvatarFallback>
                    {user.username?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
          {/* User Info Section */}
          <div className="flex flex-col items-center text-center">
            <h2 className="text-lg font-semibold">{user.username}</h2>
            <p className="text-sm text-muted-foreground max-w-xs">
              {user?.biography || "No bio available."}
            </p>

            {/* Status */}
            <div className="flex justify-center items-center space-x-2 mt-2">
              <Badge
                variant={user.status === "online" ? "success" : "secondary"}
              >
                {user.status === "online" ? "Online" : "Offline"}
              </Badge>
            </div>
          </div>
          {/* Actions */}
          <div className="w-full grid grid-cols-6 p-4 place-items-center">
            <div className="col-span-1" />

            {/* Phone Action */}
            <div className="flex flex-col items-center justify-center bg-blue-100/50 dark:bg-blue-800/20 rounded-lg shadow-blue-300/30 w-16 h-16 transform transition-all duration-200 ease-in-out hover:scale-110 shadow-lg">
              <Phone className="w-4 h-4 text-blue-400" />
            </div>

            {/* Search Action */}
            <div className="flex flex-col items-center justify-center bg-blue-100/50 dark:bg-blue-800/20 rounded-lg shadow-blue-300/30 w-16 h-16 transform transition-all duration-200 ease-in-out hover:scale-110 shadow-lg">
              <Search className="w-4 h-4 text-blue-400" />
            </div>

            {/* Message Action */}
            <div className="flex flex-col items-center justify-center bg-blue-100/50 dark:bg-blue-800/20 rounded-lg shadow-blue-300/30 w-16 h-16 transform transition-all duration-200 ease-in-out hover:scale-110 shadow-lg">
              <MessageCircle className="w-4 h-4 text-blue-400" />
            </div>

            {/* More Vertical Action */}
            <div className="flex flex-col items-center justify-center bg-blue-100/50 dark:bg-blue-800/20 rounded-lg shadow-blue-300/30 w-16 h-16 transform transition-all duration-200 ease-in-out hover:scale-110 shadow-lg">
              <MoreVertical className="w-4 h-4 text-blue-400" />
            </div>

            <div className="col-span-1" />
          </div>

          {/* User Info */}
          <div className="px-6 space-y-3 text-center">
            {/* Details */}
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>{user.email || "No email provided"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>
                  Joined:{" "}
                  <span className="font-semibold text-blue-400">
                    {format(user.joined, "MMMM yyyy") || "N/A"}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="py-2 mt-4 flex justify-center gap-4">
            {/* Message Button */}
            <Button className="flex items-center gap-2 px-4 py-2 bg-blue-400 hover:bg-blue-500 text-blue-50 transition-all duration-200 ease-in-out rounded-md shadow-md hover:scale-105">
              <MessageCircle className="w-5 h-5" /> {/* Message Icon */}
              <span>Message</span>
            </Button>

            {/* Block Button */}
            <Button className="px-4 py-2 rounded-md shadow-md bg-red-200 text-red-500 hover:bg-red-300 hover:text-red-600 transition-all duration-200 ease-in-out">
              Block
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileModal;
