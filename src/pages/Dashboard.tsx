import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { EventCard } from "@/components/events/EventCard";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, TrendingUp, Bell, Plus, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";

// Mock data
const mockUser = {
  name: "John Doe",
  email: "john@university.edu",
  role: "student" as const,
  avatar: ""
};

const mockStats = {
  student: [
    { title: "Events Registered", value: 12, change: { value: 25, type: "increase" as const }, icon: Calendar },
    { title: "Upcoming Events", value: 5, icon: Clock },
    { title: "Events Attended", value: 8, change: { value: 15, type: "increase" as const }, icon: Users },
    { title: "Notifications", value: 3, icon: Bell },
  ],
  organizer: [
    { title: "Events Created", value: 8, change: { value: 33, type: "increase" as const }, icon: Calendar },
    { title: "Total Registrations", value: 234, change: { value: 12, type: "increase" as const }, icon: Users },
    { title: "Active Events", value: 3, icon: Clock },
    { title: "Avg. Attendance", value: "85%", change: { value: 8, type: "increase" as const }, icon: TrendingUp },
  ],
  admin: [
    { title: "Total Events", value: 156, change: { value: 18, type: "increase" as const }, icon: Calendar },
    { title: "Active Users", value: 1284, change: { value: 5, type: "increase" as const }, icon: Users },
    { title: "Monthly Growth", value: "12%", change: { value: 3, type: "increase" as const }, icon: TrendingUp },
    { title: "Pending Approvals", value: 7, icon: Bell },
  ]
};

const mockEvents = [
  {
    id: "1",
    title: "Tech Conference 2024",
    description: "Annual technology conference featuring industry leaders and cutting-edge innovations.",
    date: "Dec 15, 2024",
    time: "9:00 AM - 5:00 PM",
    venue: "Main Auditorium",
    organizer: { name: "Tech Club", avatar: "" },
    registrations: 180,
    maxCapacity: 200,
    category: "Technology",
    status: "upcoming" as const,
    isRegistered: true,
    poster: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop"
  },
  {
    id: "2", 
    title: "Creative Writing Workshop",
    description: "Learn creative writing techniques from published authors and poets.",
    date: "Dec 18, 2024",
    time: "2:00 PM - 4:00 PM",
    venue: "Library Hall",
    organizer: { name: "Literature Society", avatar: "" },
    registrations: 25,
    maxCapacity: 30,
    category: "Workshop",
    status: "upcoming" as const,
    isRegistered: false,
    poster: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop"
  },
  {
    id: "3",
    title: "Annual Sports Meet",
    description: "Inter-departmental sports competition with various indoor and outdoor events.",
    date: "Dec 20, 2024",
    time: "8:00 AM - 6:00 PM", 
    venue: "Sports Complex",
    organizer: { name: "Sports Committee", avatar: "" },
    registrations: 150,
    maxCapacity: 300,
    category: "Sports",
    status: "upcoming" as const,
    isRegistered: true,
    poster: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop"
  }
];

interface DashboardProps {
  userRole?: "student" | "organizer" | "admin";
}

export default function Dashboard({ userRole = "student" }: DashboardProps) {
  const [user] = useState({ ...mockUser, role: userRole });
  const stats = mockStats[userRole];

  const handleRegister = (eventId: string) => {
    console.log("Registering for event:", eventId);
  };

  const handleUnregister = (eventId: string) => {
    console.log("Unregistering from event:", eventId);
  };

  const handleCreateEvent = () => {
    console.log("Creating new event");
  };

  const handleViewEvent = (eventId: string) => {
    console.log("Viewing event:", eventId);
  };

  const getDashboardTitle = () => {
    switch (userRole) {
      case "student":
        return "Student Dashboard";
      case "organizer":
        return "Organizer Dashboard";
      case "admin":
        return "Admin Dashboard";
      default:
        return "Dashboard";
    }
  };

  const getDashboardSubtitle = () => {
    switch (userRole) {
      case "student":
        return "Discover and register for exciting campus events";
      case "organizer":
        return "Manage your events and track registrations";
      case "admin":
        return "Oversee all campus events and user activities";
      default:
        return "Welcome to Campus Event Manager";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader 
        title={getDashboardTitle()}
        subtitle={getDashboardSubtitle()}
        userRole={userRole}
        onCreateEvent={handleCreateEvent}
      />
      
      <main className="p-6 space-y-6">
        {/* Stats Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <StatsCard {...stat} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Recent Activities */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-gradient-card shadow-lg border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold text-foreground">
                        {userRole === "student" ? "Recommended Events" : "Recent Events"}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {userRole === "student" 
                          ? "Events you might be interested in" 
                          : "Latest event activities"
                        }
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockEvents.slice(0, 2).map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="border border-border rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">{event.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                            {event.description}
                          </p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {event.date}
                            </span>
                            <span className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {event.venue}
                            </span>
                            <span className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {event.registrations}/{event.maxCapacity}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge variant="secondary">{event.category}</Badge>
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-card shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground">Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {userRole === "student" && (
                  <>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Browse Events
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      My Registrations
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Bell className="h-4 w-4 mr-2" />
                      Notifications
                    </Button>
                  </>
                )}
                {userRole === "organizer" && (
                  <>
                    <Button variant="hero" className="w-full justify-start">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Event
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Manage Registrations
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      View Analytics
                    </Button>
                  </>
                )}
                {userRole === "admin" && (
                  <>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Manage Users
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Approve Events
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      System Analytics
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Featured Events Grid */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {userRole === "student" ? "Upcoming Events" : "Event Overview"}
              </h2>
              <Button variant="outline">
                View All Events
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <EventCard
                    event={event}
                    userRole={userRole}
                    onRegister={handleRegister}
                    onUnregister={handleUnregister}
                    onView={handleViewEvent}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}