import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Calendar,
  Users,
  BarChart3,
  Settings,
  Bell,
  Home,
  Plus,
  User,
  LogOut,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/enhanced-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const studentMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Browse Events", url: "/events", icon: Calendar },
  { title: "My Events", url: "/my-events", icon: User },
  { title: "Notifications", url: "/notifications", icon: Bell },
];

const organizerMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "My Events", url: "/my-events", icon: Calendar },
  { title: "Create Event", url: "/create-event", icon: Plus },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Notifications", url: "/notifications", icon: Bell },
];

const adminMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "All Events", url: "/all-events", icon: Calendar },
  { title: "Users", url: "/users", icon: Users },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

interface AppSidebarProps {
  userRole: "student" | "organizer" | "admin";
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export function AppSidebar({ userRole, user }: AppSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const getMenuItems = () => {
    switch (userRole) {
      case "student":
        return studentMenuItems;
      case "organizer":
        return organizerMenuItems;
      case "admin":
        return adminMenuItems;
      default:
        return studentMenuItems;
    }
  };

  const menuItems = getMenuItems();
  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary text-primary-foreground font-medium shadow-sm" 
      : "hover:bg-secondary/50 text-foreground";

  return (
    <Sidebar className={`${isCollapsed ? "w-16" : "w-64"} transition-all duration-300`} collapsible="icon">
      <SidebarContent>
        {/* User Profile Section */}
        <div className="p-4 border-b border-border">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user.name.split(" ").map(n => n[0]).join("").toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {user.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Navigation Menu */}
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavCls}>
                        <item.icon className="h-5 w-5" />
                        {!isCollapsed && <span className="ml-3">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings & Logout */}
        <div className="mt-auto p-4 border-t border-border">
          <div className="space-y-2">
            <Button
              variant="ghost"
              size={isCollapsed ? "icon" : "default"}
              className="w-full justify-start"
            >
              <Settings className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">Settings</span>}
            </Button>
            <Button
              variant="ghost"
              size={isCollapsed ? "icon" : "default"}
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">Logout</span>}
            </Button>
          </div>
        </div>
      </SidebarContent>

      {/* Sidebar Toggle Button */}
      <SidebarTrigger className="absolute -right-3 top-6 z-10" onClick={() => setIsCollapsed(!isCollapsed)} />
    </Sidebar>
  );
}