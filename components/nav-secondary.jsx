"use client"; // Make NavSecondary fully client-side

import * as React from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import dynamic from "next/dynamic";

const SupportModal = dynamic(() =>
  import("@/components/modals/support/SupportModal")
);

const defaultItems = [
  { title: "Dashboard", url: "/dashboard", icon: () => <span>📊</span> },
  { title: "Messages", url: "/messages", icon: () => <span>✉️</span> },
  {
    title: "Support",
  },
];

export function NavSecondary({ items = defaultItems, ...props }) {
  const [isSupportOpen, setIsSupportOpen] = React.useState(false);
  const handleOpen = React.useCallback(() => setIsSupportOpen(true), []);
  const handleClose = React.useCallback(() => setIsSupportOpen(false), []);

  return (
    <>
      <SidebarGroup {...props}>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                {item.title === "Support" ? (
                  <SidebarMenuButton
                    onClick={handleOpen}
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
      {isSupportOpen && (
        <SupportModal isOpen={isSupportOpen} setIsOpen={handleClose} />
      )}
    </>
  );
}
