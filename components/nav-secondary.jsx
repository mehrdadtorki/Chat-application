"use client"; // Make NavSecondary fully client-side

import React from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import dynamic from "next/dynamic";

// Dynamically import both modals
const SupportModal = dynamic(() => import("@/components/modals/SupportModal"));
const FeedbackModal = dynamic(() =>
  import("@/components/modals/FeedbackModal")
);

const defaultItems = [
  { title: "Dashboard", url: "/dashboard", icon: () => <span>📊</span> },
  { title: "Messages", url: "/messages", icon: () => <span>✉️</span> },
  { title: "Support", icon: () => <span>❓</span> }, // Added icon for consistency
  { title: "Feedback", icon: () => <span>💬</span> }, // New Feedback item
];

export function NavSecondary({ items = defaultItems, ...props }) {
  // State for Support Modal
  const [isSupportOpen, setIsSupportOpen] = React.useState(false);
  const handleSupportOpen = React.useCallback(() => setIsSupportOpen(true), []);
  const handleSupportClose = React.useCallback(
    () => setIsSupportOpen(false),
    []
  );

  // State for Feedback Modal
  const [isFeedbackOpen, setIsFeedbackOpen] = React.useState(false);
  const handleFeedbackOpen = React.useCallback(
    () => setIsFeedbackOpen(true),
    []
  );
  const handleFeedbackClose = React.useCallback(
    () => setIsFeedbackOpen(false),
    []
  );

  return (
    <>
      <SidebarGroup {...props}>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                {item.title === "Support" ? (
                  <SidebarMenuButton
                    onClick={handleSupportOpen}
                    size="sm"
                    className="w-full justify-start flex items-center gap-2"
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                ) : item.title === "Feedback" ? (
                  <SidebarMenuButton
                    onClick={handleFeedbackOpen}
                    size="sm"
                    className="w-full justify-start flex items-center gap-2"
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                ) : (
                  <SidebarMenuButton asChild size="sm">
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Render Support Modal */}
      {isSupportOpen && (
        <SupportModal
          isOpen={isSupportOpen}
          setIsOpen={setIsSupportOpen} // Changed to setIsSupportOpen directly
          isLoading={false} // Assuming no loading state for simplicity; adjust as needed
        />
      )}

      {/* Render Feedback Modal */}
      {isFeedbackOpen && (
        <FeedbackModal isOpen={isFeedbackOpen} setIsOpen={setIsFeedbackOpen} />
      )}
    </>
  );
}
