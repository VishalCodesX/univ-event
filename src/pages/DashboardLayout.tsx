import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

// Mock user data - in real app this would come from auth context
const mockUsers = {
  student: {
    name: "Alice Johnson",
    email: "alice@university.edu",
    avatar: "",
    role: "student" as const
  },
  organizer: {
    name: "Bob Smith", 
    email: "bob@university.edu",
    avatar: "",
    role: "organizer" as const
  },
  admin: {
    name: "Carol Admin",
    email: "carol@university.edu", 
    avatar: "",
    role: "admin" as const
  }
};

interface DashboardLayoutProps {
  userRole?: "student" | "organizer" | "admin";
}

export default function DashboardLayout({ userRole = "student" }: DashboardLayoutProps) {
  const user = mockUsers[userRole];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar userRole={userRole} user={user} />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}