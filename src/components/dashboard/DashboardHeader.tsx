import { Bell, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/enhanced-button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  userRole: "student" | "organizer" | "admin";
  onCreateEvent?: () => void;
}

export function DashboardHeader({ title, subtitle, userRole, onCreateEvent }: DashboardHeaderProps) {
  return (
    <motion.header 
      className="bg-card border-b border-border px-6 py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          {subtitle && (
            <p className="text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search..."
              className="pl-10 w-64"
            />
          </div>

          {/* Create Button for Organizers */}
          {(userRole === "organizer" || userRole === "admin") && (
            <Button 
              variant="hero" 
              size="sm"
              onClick={onCreateEvent}
              className="shadow-lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          )}

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive"
                >
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start space-y-1 p-3">
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">Event Reminder</span>
                  <span className="text-xs text-muted-foreground">2m ago</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  "Tech Conference 2024" starts in 30 minutes
                </p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start space-y-1 p-3">
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">New Registration</span>
                  <span className="text-xs text-muted-foreground">1h ago</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Someone registered for your event
                </p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start space-y-1 p-3">
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">Event Update</span>
                  <span className="text-xs text-muted-foreground">3h ago</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Venue changed for "Workshop Series"
                </p>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center justify-center">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
}